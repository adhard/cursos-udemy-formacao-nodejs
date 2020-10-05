const express = require('express')
const router = express.Router()
const Category = require('../categories/Category')
const Article = require('./Article')
const slugify = require('slugify')

router.get('/admin/articles', (req, res) => {
    Article.findAll({
        include: [{model: Category}] // JOIN
    })
    .then(articles => {
        res.render('admin/articles/index',{articles})
    })
});

router.get('/admin/articles/new', (req, res) => {
    Category.findAll().then(categories => {
        res.render("admin/articles/new",{categories})
    })
});

router.post('/articles/save', (req, res) => {
    const title = req.body.title
    const body = req.body.body
    const categoryId = req.body.category

    Article.create({
        title,
        slug: slugify(title),
        body,
        categoryId
    })
    .then(() => {
        res.redirect('/admin/articles')
    })
})

router.post('/articles/delete', (req, res) => {
    const id = req.body.id

    if(!isNaN(id)){ // ser numerico
       
        Article.destroy({
            where: [{
                id // id da tabela === id do parametro
            }]
        })
        .then(() => {
            res.redirect('/admin/articles')
        })

    } else {
        res.redirect('/admin/articles/new')
    }
})

module.exports = router