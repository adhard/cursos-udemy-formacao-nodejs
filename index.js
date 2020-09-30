const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const connection = require('./database/database')

const Pergunta = require('./database/models/Pergunta')

// Database
connection.authenticate()
    .then( ()=> {
        console.log('Conexao do db OK')
    })
    .catch( (error) => {
        console.log('Conexao do db erro: ' + error)
    })

// dizendo para o express usar o EJS como view engine
app.set('view engine', 'ejs')

app.use(express.static('public')) //permite ao nodejs utilizar arquivos estaticos (css, imgs, arquivos html...), "public" é o nome da pasta

// body parser
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

app.get('/', (req, res) => {
    Pergunta.findAll({ raw: true })
        .then( (perguntas) => {
            res.render("index", { perguntas })
        })
})

app.get('/perguntar', (req, res) => {
    res.render("perguntar")
})

app.post("/salvarpergunta", (req, res) => {
    const titulo = req.body.titulo
    const descricao = req.body.descricao
    Pergunta.create({
        title: titulo,
        description: descricao
    })
    .then( () => {
        res.redirect("/") //redireciona para /
    })
})

app.listen(8001, () => {
    console.log("Server started...")
})