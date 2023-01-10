const joi = require('joi')

const name = joi.string().required()
const alias = joi.string().alphanum().required()

exports.add_cate_schema = {
    body: {
        name,
        alias
    }
}