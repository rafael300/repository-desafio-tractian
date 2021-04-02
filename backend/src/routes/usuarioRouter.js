const express = require('express')
const usuario = require('../models/usuarioSchema')
const router = express.Router()

router.get('/usuario', (req, res)=>{
    usuario.find({}).populate("empresa").then((item)=>{
        res.status(200)
        res.send(item)
    }).catch((err)=>{
        res.status(400) 
        console.log(err)
    })})

router.post('/usuario', (req,res, next)=>{
    usuario.create(req.body).then((item)=>{
        res.send(item)
    })})


router.delete('/usuario/:id', (req, res, next)=>{
    usuario.findByIdAndDelete({_id: req.params.id}).then((item)=>{
        res.send(item)
    })})


router.put('/usuario/:id', (req, res, next)=>{
    usuario.findByIdAndUpdate({_id: req.params.id}, req.body).then((item)=>{
        res.send(item)
    })})

module.exports = router