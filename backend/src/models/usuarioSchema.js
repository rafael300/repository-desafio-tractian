const mongoose = require('mongoose')
mongoose.connect('mongodb+srv://deploy:deployupdate@cluster0.m5thh.mongodb.net/empresadb?retryWrites=true&w=majority', {useNewUrlParser: true, useFindAndModify: false})
mongoose.Promise = global.Promise

const usuarioSchema = new mongoose.Schema({
    nome:{
        type: String,
        require: true
    },
    cargo:{
        type: String,
        require: true
    },
    email:{
        type: String,
        require: true
    },
    empresa:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: "empresa",
        require: false
    }]
})

const model = mongoose.model('usuario', usuarioSchema)

module.exports = model