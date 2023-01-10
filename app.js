//导入express
const express = require('express')
//创建服务器的实例对象
const app = express()

const joi = require('joi')

//导入并配置cors中间件
const cors = require('cors')
app.use(cors())

//配置解析表单数据的中间件,这个中间件只能解析application/x-www-form-urlencoded格式的表单数据
app.use(express.urlencoded({ extended: false }))
//一定要在路由之前封装错误提示函数
app.use((req, res, next) => {
    res.cc = function (err, status = 1) {
        res.send({
            status,
            message: err instanceof Error ? err.message : err
        })
    }
    next()
})
//一定要在路由之前配置解析Token的中间件
const expressJWT = require('express-jwt')
const config = require('./config')
app.use(expressJWT({ secret: config.jwtSecretKey }).unless({ path: [/^\/api\//] }))

const userRouter = require('./router/user')
app.use('/api', userRouter)
const userinfoRouter = require('./router/userinfo')
app.use('/my', userinfoRouter)
const artcateRouter=require('./router/artcate')
app.use('/my/article',artcateRouter)

//定义错误级别的中间件
app.use((err, req, res, next) => {
    //表单数据错误的错误提示
    if (err instanceof joi.ValidationError) return res.cc(err)
    //身份认证失败的错误
    if (err.name === 'UnauthorizedError') return res.cc('身份认证失败！')
    res.cc(err)
})
//启动服务器
app.listen('3007', () => {
    console.log('api server running at http://127.0.0.1:3007');
})