const express = require('express')
const router = express.Router()
const {
    getUserinfo,
    updateUserinfo,
    updatePassword,
    updateAvatar
} = require('../router_handler/userinfo')
const expressJoi = require('@escook/express-joi')
const {
    update_userinfo_schema,
    update_password_schema,
    update_avatar_schema
} = require('../schema/user')

router.get('/userinfo', getUserinfo)
router.post('/userinfo', expressJoi(update_userinfo_schema), updateUserinfo)
router.post('/updatepwd', expressJoi(update_password_schema), updatePassword)
router.post('/update/avatar', expressJoi(update_avatar_schema), updateAvatar)

module.exports = router