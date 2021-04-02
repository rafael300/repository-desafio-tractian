const express = require('express')
const unidade = require('../models/unidadeSchema')
const router = express.Router()

router.get('/unidade', (req, res)=>{
    unidade.find({}).populate("ativo").then((item)=>{
        res.status(200)
        res.send(item)
    }).catch((err)=>{
        res.status(400) 
        console.log(err)
    })})

router.post('/unidade', (req,res, next)=>{
    unidade.create(req.body).then((item)=>{
        res.send(item)
    })})


router.delete('/unidade/:id', (req, res, next)=>{
    unidade.findByIdAndDelete({_id: req.params.id}).then((item)=>{
        res.send(item)
    })})


router.put('/unidade/:id', (req, res, next)=>{
    unidade.findByIdAndUpdate({_id: req.params.id}, req.body).then((item)=>{
        res.send(item)
    })})

module.exports = router