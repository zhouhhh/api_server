const express = require('express')
const router = express.Router()
const article_handler = require('../router_handler/article')

const expressJoi = require('@escook/express-joi')
const { add_article_schema } = require('../schema/article')

router.post('/add', article_handler.addArticle)

module.exports = router