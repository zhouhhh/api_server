const express = require('express')
const router = express.Router()
const userinfo_handler = require('../router_handler/userinfo')
const expressJoi = require('@escook/express-joi')
const { update_userinfo_schema, update_password_schema,update_avatar_schema } = require('../schema/user')

router.get('/userinfo', userinfo_handler.getUserinfo)
router.post('/userinfo', expressJoi(update_userinfo_schema), userinfo_handler.updateUserinfo)
router.post('/updatepwd', expressJoi(update_password_schema), userinfo_handler.updatePassword)
router.post('/update/avatar',expressJoi(update_avatar_schema), userinfo_handler.updateAvatar)

module.exports = router