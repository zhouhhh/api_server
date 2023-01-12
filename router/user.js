const express = require('express')
//创建路由对象
const router = express.Router()

const { regUser, login } = require('../router_handler/user')

//导入验证表单数据的中间件
const expressJoi = require('@escook/express-joi')
//导入需要的验证规则对象
const { reg_login_schema } = require('../schema/user')

//注册新用户
router.post('/reguser', expressJoi(reg_login_schema), regUser)
//登录
router.post('/login', expressJoi(reg_login_schema), login)


module.exports = router