const express = require('express')
const ativo = require('../models/ativoSchema')
const router = express.Router()

router.get('/ativo', (req, res)=>{
    ativo.find({}).populate("usuario").then((item)=>{
        res.status(200)
        res.send(item)
    }).catch((err)=>{
        res.status(400) 
        console.log(err)
    })})

router.post('/ativo', (req,res, next)=>{
    ativo.create(req.body).then((item)=>{
        res.send(item)
    })})


router.delete('/ativo/:id', (req, res, next)=>{
    ativo.findByIdAndDelete({_id: req.params.id}).then((item)=>{
        res.send(item)
    })})


router.put('/ativo/:id', (req, res, next)=>{
    ativo.findByIdAndUpdate({_id: req.params.id}, req.body).then((item)=>{
        res.send(item)
    })})

module.exports = router