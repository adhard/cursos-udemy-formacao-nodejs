const express = require('express')
const app = express()

// dizendo para o express usar o EJS como view engine
app.set('view engine', 'ejs')

app.get('/', (req, res) => {
    res.render("index") // nome do arquivo .ejs dentro de views
})

app.listen(8001, () => {
    console.log("Server started...")
})