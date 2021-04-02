const express = require('express')
const empresa = require('../models/empresaSchema')
const router = express.Router()

router.get('/empresa', (req, res)=>{
    empresa.find({}).populate("unidade").then((item)=>{
        res.status(200)
        res.send(item)
    }).catch((err)=>{
        res.status(400) 
        console.log(err)
    })})

router.post('/empresa', (req,res, next)=>{
    empresa.create(req.body).then((item)=>{
        res.send(item)
    })})


router.delete('/empresa/:id', (req, res, next)=>{
    empresa.findByIdAndDelete({_id: req.params.id}).then((item)=>{
        res.send(item)
    })})


router.put('/empresa/:id', (req, res, next)=>{
    empresa.findByIdAndUpdate({_id: req.params.id}, req.body).then((item)=>{
        res.send(item)
    })})

module.exports = router