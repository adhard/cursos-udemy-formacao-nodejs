const express = require('express')

const server = express() // Iniciando o express

server.get('/', (req, res) => {
    return res.send("Olá mundo !!")
})

server.get('/ola/:nome', (req, res) => {
    // req.params.nome -> URL/adriano
    const nome = req.params.nome
    
    return res.send("Olá "+nome)
})

server.get('/oi/:nome?', (req, res) => { //nome é um parametro opcional
    const nome = req.params.nome

    if(nome) return res.send("Oi "+nome)
    
    return res.send("Oi para ninguém")
})


/**
 * 
 * Query Params
 * 
 */

server.get('/canal/youtube', (req, res) => { //ex: localhost:4001/canal/youtube?canal="bearcode"
    const canal = req.query["canal"]
    return res.send("Acesse meu canal no youtube: "+canal)
})

server.listen(8001, function(erro){
    if(erro) console.log("Erro")
    else console.log("Servidor Iniciado")
})