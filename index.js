const express = require('express')

const server = express() // Iniciando o express

server.get('/', (req, res) => {
    return res.send("Olá mundo !!")
})

server.listen(8001, function(erro){
    if(erro) console.log("Erro")
    else console.log("Servidor Iniciado")
})