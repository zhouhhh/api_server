const db = require('../db/index')

exports.getArticleCates = (req, res) => {
    db.query('select * from ev_article_cate where is_delete=0 order by id asc', (err, results) => {
        if (err) return res.cc(err)
        res.send({
            status: 0,
            message: '获取文章分类列表成功！',
            data: results
        })
    })
}
exports.addArticleCates = (req, res) => {
    const { body } = req
    const { name, alias } = body
    db.query('select * from ev_article_cate where name=? or alias=?', [name, alias], (err, results) => {
        if (err) return res.cc(err)
        if (results.length === 2 || (results.length === 1 && results[0].name === name && results[0].alias === alias))
            return res.cc('分类名称和别名被占用，请更换后重试！')
        if (results.length === 1 && results[0].name === name) return res.cc('分类名称被占用，请更换后重试！')
        if (results.length === 1 && results[0].alias === alias) return res.cc('分类别名被占用，请更换后重试！')
        db.query('insert into ev_article_cate set ?', body, (err, results) => {
            if (err) return res.cc(err)
            if (results.affectedRows !== 1) return res.cc('新增文章分类失败！')
            res.cc('新增文章分类成功！', 0)
        })
    })
}
exports.deleteCateById = (req, res) => {
    db.query('update ev_article_cate set is_delete=1 where id=?', req.params.id, (err, results) => {
        if (err) return res.cc(err)
        if (results.affectedRows !== 1) return res.cc('删除文章分类失败！')
        res.cc('删除文章分类成功！', 0)
    })
}
exports.getArtCateById = (req, res) => {
    db.query('select * from ev_article_cate where id=?', req.params.id, (err, results) => {
        if (err) return res.cc(err)
        if (results.length !== 1) return res.cc('获取文章分类数据失败！')
        res.send({
            status: 0,
            message: '获取文章分类数据成功！',
            data: results[0]
        })
    })
}
exports.updateArtCateById = (req, res) => {
    const { body } = req
    const { name, alias, id } = body
    db.query('select * from ev_article_cate where id<>? and (name=? or alias=?)', [id, name, alias], (err, results) => {
        if (err) return res.cc(err)
        if (results.length === 2 || (results.length === 1 && results[0].name === name && results[0].alias === alias))
            return res.cc('分类名称和别名被占用，请更换后重试！')
        if (results.length === 1 && results[0].name === name) return res.cc('分类名称被占用，请更换后重试！')
        if (results.length === 1 && results[0].alias === alias) return res.cc('分类别名被占用，请更换后重试！')
        db.query('update ev_article_cate set ? where id=?', [body, id], (err, results) => {
            if (err) return res.cc(err)
            if (results.affectedRows !== 1) return res.cc('更新文章分类失败！')
            res.cc('更新文章分类成功！', 0)
        })
    })
}