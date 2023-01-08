const db = require('../db/index')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const config = require('../config')

exports.regUser = (req, res) => {
    const userinfo = req.body
    // if(!userinfo.username||!userinfo.password){
    //     return res.send({status:1,message:'用户名或者密码不合法'})
    // }
    const sql = 'select * from ev_users where username=?'
    db.query(sql, userinfo.username, (err, results) => {
        // if(err) return res.send({ status:1,message:err.message }) 
        if (err) return res.cc(err)
        // if(results.length>0) return res.send({ status:1,message:'用户名已被占用，请重新输入' })
        if (results.length > 0) return res.cc('用户名已被占用，请重新输入')
        //密码加密
        userinfo.password = bcrypt.hashSync(userinfo.password, 10)
        //插入新用户
        db.query('insert into ev_users set ?', { username: userinfo.username, password: userinfo.password }, (err, results) => {
            if (err) return res.cc(err)
            if (results.affectedRows !== 1) return res.cc('注册失败，请重试')
            res.cc('注册成功！', 0)
        })
    })
}
exports.login = (req, res) => {
    const userinfo = req.body
    const sql = 'select * from ev_users where username=?'
    db.query(sql, userinfo.username, (err, results) => {
        if (err) return res.cc(err)
        if (results.length !== 1) return res.cc('登录失败！')
        //比较用户输入的密码和数据库保存的密码是否一致
        const compareResults = bcrypt.compareSync(userinfo.password, results[0].password)
        if (!compareResults) return res.cc('登录失败！')

        const user = { ...results[0], password: '' }
        const tokenStr = jwt.sign(user, config.jwtSecretKey, { expiresIn: config.expiresIn })
        res.send({
            status: 0,
            message: '登录成功！',
            token: 'Bearer ' + tokenStr
        })
    })
}