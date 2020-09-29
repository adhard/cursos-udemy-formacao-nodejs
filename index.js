const express = require('express')
const app = express()

// dizendo para o express usar o EJS como view engine
app.set('view engine', 'ejs')

app.use(express.static('public')) //permite ao nodejs utilizar arquivos estaticos (css, imgs, arquivos html...), "public" é o nome da pasta

app.get('/', (req, res) => {

    const produtos = [
        {
            nome: 'notebook',
            preco: 2000.00
        },
        {
            nome: 'mouse',
            preco: 150.00
        },
        {
            nome: 'monitor',
            preco: 1000.00
        }
    ]

    res.render("index", {
        nome: "Adriano Hardtke",
        exibirMsg: false,
        produtos
    }) // index é nome do arquivo .ejs dentro de views
})

app.listen(8001, () => {
    console.log("Server started...")
})