const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const connection = require('./database/database')

// Controllers
const categoriesController = require('./categories/CategoriesController')
const articlesController = require('./articles/ArticlesController')

// Models
const Article = require('./articles/Article')
const Category = require('./categories/Category')

// View Engine
app.set('view engine','ejs')

// static
app.use(express.static('public'))

// body parser
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

// connection db
connection.authenticate()
    .then(()=> {
        console.log('Conectado ao banco de dados')
    })
    .catch((erro)=> {
        console.log('Erro ao conectar ao banco de dados:\n'+ erro)
})

app.use("/", categoriesController)
app.use("/", articlesController)


app.get('/:slug', (req, res) => {

    const slug = req.params.slug

    Article.findOne({
        where: {
            slug
        }
    })
    .then(article => {
        if(article){
            res.render('article', {article})
        } else {
            res.redirect('/')
        }
    })
    .catch(error => {
        res.redirect('/')
    })
})

app.get('/', (req, res) => {

    Article.findAll({
        order: [
            ['id','DESC']
        ]
    })
    .then(articles => {
        res.render('index', {articles})
    })
})

app.listen(8001, () => {
    console.log('Server started')
})