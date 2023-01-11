const joi = require('joi')

const name = joi.string().required()
const alias = joi.string().alphanum().required()

const id = joi.number().integer().min(1).required()

exports.add_article_schema = {
    body: {
        name,
        alias
    }
}