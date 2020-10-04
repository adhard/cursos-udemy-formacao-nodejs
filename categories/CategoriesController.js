const express = require('express')
const router = express.Router()
const Category = require('./Category')
const slugify = require('slugify')

router.get('/admin/categories/new', (req, res) => {
    res.render('admin/categories/new')
});

router.post('/categories/save', (req, res) => {
    const title = req.body.title;

    if(title){
        Category.create({
            title,
            slug: slugify(title)
        })
        .then(()=> {
            res.redirect('/admin/categories')
        })
    } else {
        res.redirect('/admin/categories/new')
    }
})

router.get('/admin/categories', (req, res) => {
    Category.findAll().then(categories => {
        res.render('admin/categories/index', {categories})
    })
})

router.post('/categories/delete', (req, res) => {
    const id = req.body.id

    if(!isNaN(id)){ // ser numerico
       
        Category.destroy({
            where: [{
                id // id da tabela === id do parametro
            }]
        })
        .then(() => {
            res.redirect('/admin/categories')
        })

    } else {
        res.redirect('/admin/categories/new')
    }
})

router.get('/admin/categories/edit/:id', (req, res) => {
    const id = req.params.id
    Category.findByPk(id)
    .then(category => {
        if(!isNaN(id)){
            res.render('admin/categories/edit', {category})
        } else {
            res.redirect('/admin/categories')
        }
    })
    .catch(error => {
        res.redirect('/admin/categories')
    })
})



module.exports = router