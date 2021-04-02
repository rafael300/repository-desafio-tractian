const mongoose = require('mongoose')
mongoose.connect('mongodb+srv://deploy:deployupdate@cluster0.m5thh.mongodb.net/empresadb?retryWrites=true&w=majority', {useNewUrlParser: true, useFindAndModify: false})
mongoose.Promise = global.Promise

const empresaSchema = new mongoose.Schema({
    nome:{
        type: String,
        require: true
    },
    endereco:{
        type: String,
        require: true
    },
    unidade:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: "unidade",
        require: false,
    }]
})

const model = mongoose.model('empresa', empresaSchema)

module.exports = model