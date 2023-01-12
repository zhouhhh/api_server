const db = require('../db/index')
const bcrypt = require('bcryptjs')
const sql = 'select id, username,nickname,email from ev_users where id=?'
exports.getUserinfo = (req, res) => {
    db.query(sql, req.user.id, (err, results) => {
        if (err) return res.cc(err)
        if (results.length !== 1) return res.cc('获取用户信息失败！')
        res.send({
            status: 0,
            message: '获取用户信息成功！',
            data: results[0]
        })
    })
}
exports.updateUserinfo = (req, res) => {
    const { body } = req
    const { id } = body
    db.query('update ev_users set ? where id=?', [body, id], (err, results) => {
        if (err) return res.cc(err)
        if (results.affectedRows !== 1) return res.cc('修改用户信息失败！')
        res.cc('修改用户信息成功！', 0)
    })
}

exports.updatePassword = (req, res) => {
    const { user: { id }, body: { oldPwd, newPwd } } = req
    db.query('select * from ev_users where id=?', id, (err, results) => {
        if (err) return res.cc(err)
        if (results.length !== 1) return res.cc('用户不存在！')
        const compareResults = bcrypt.compareSync(oldPwd, results[0].password)
        if (!compareResults) return res.cc('旧密码错误！')
        const newPwds = bcrypt.hashSync(newPwd, 10)
        db.query('update ev_users set password=? where id=?', [newPwds, id], (err, results) => {
            if (err) return res.cc(err)
            if (results.affectedRows !== 1) return res.cc('更新密码失败！')
            res.cc('更新密码成功！', 0)
        })
    })
}

exports.updateAvatar = (req, res) => {
    const { user: { id }, body: { avatar } } = req
    db.query('update ev_users set user_pic=? where id=?', [avatar, id], (err, results) => {
        if (err) return res.cc(err)
        if (results.affectedRows !== 1) return res.cc('更新头像失败！')
        res.cc('更新头像成功！', 0)
    })

}