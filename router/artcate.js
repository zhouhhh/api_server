const express = require('express')
const router = express.Router()
const artcate_handler = require('../router_handler/artcate')

const expressJoi = require('@escook/express-joi')
const { add_cate_schema } = require('../schema/artcate')

router.get('/cates', artcate_handler.getArticleCates)
router.post('/addcates', expressJoi(add_cate_schema), artcate_handler.addArticleCates)

module.exports = router