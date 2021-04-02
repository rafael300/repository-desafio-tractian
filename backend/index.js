const express = require('express')
const app = express()
const bodyParse = require('body-parser')
const cors = require('cors')
const port = process.env.PORT || 27017
const ativoRouter = require('./src/routes/ativoRouter')
const usuarioRouter = require('./src/routes/usuarioRouter')
const empresaRouter = require('./src/routes/empresaRouter')
const unidadeRouter = require('./src/routes/unidadeRouter')

app.use(cors())

app.use(bodyParse.urlencoded({extended: true}))
app.use(bodyParse.json())

app.use('/app', ativoRouter, unidadeRouter, empresaRouter, usuarioRouter)

app.listen(port, ()=>{
    console.log('Servidor rodando!')
})