const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const connection = require('./database/database')

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


app.get('/', (req, res) => {
    res.render('index')
})

app.listen(8001, () => {
    console.log('Server started')
})