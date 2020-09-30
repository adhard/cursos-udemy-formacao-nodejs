const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const connection = require('./database/database')

const Pergunta = require('./database/models/Pergunta')
const Resposta = require('./database/models/Resposta')

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
    Pergunta.findAll({ raw: true, order: [
        ['createdAt','DESC'] // OU ASC
    ] })
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

app.get('/pergunta/:id', (req, res) => {
    const id = req.params.id;
    Pergunta.findOne({
        where: {
            id //id da tabela == id da requisicao
        }
    }).then( pergunta => {
        if(pergunta){

            Resposta.findAll({
                where: {perguntaId: pergunta.id},
                order: [['id','DESC']]
            }).then( respostas => {
                res.render('pergunta', {
                    pergunta,
                    respostas
                })
            })
            
        } else { 
            res.redirect('/')
        }
    })
})

app.post('/responder', (req, res) => {
    const corpo = req.body.corpo
    const perguntaId = req.body.pergunta
    Resposta.create({
        corpo,
        perguntaId
    }).then(() => {
        res.redirect(`/pergunta/${perguntaId}`)
    })
})

app.listen(8001, () => {
    console.log("Server started...")
})