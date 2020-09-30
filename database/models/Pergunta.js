const Sequelize = require('sequelize')
const connection = require('../database')

const pergunta = connection.define('perguntas', {
    title: {
        type: Sequelize.STRING,
        allowNull: false
    },
    description: {
        type: Sequelize.TEXT,
        allowNull: false
    }
})

pergunta.sync({force: false})
    .then(()=> {
        console.log('Tabela Pergunta criada')
    })

module.exports = pergunta