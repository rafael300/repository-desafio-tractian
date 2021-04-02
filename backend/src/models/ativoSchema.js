const mongoose = require('mongoose')
mongoose.connect('mongodb+srv://deploy:deployupdate@cluster0.m5thh.mongodb.net/empresadb?retryWrites=true&w=majority', {useNewUrlParser: true, useFindAndModify: false})
mongoose.Promise = global.Promise

const ativoSchema = new mongoose.Schema({
    imagem:{
        type: String,
        require: false
    },
    nome:{
        type: String,
        require: true
    },
    descricao:{
        type: String,
        require: false
    },
    modelo:{
        type: String,
        require: true
    },
    usuario:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: "usuario",
        require: false
    }],
    saudenv:{
        type: Number,
        require: false
    },
    operacao:{
        type: Boolean,
        require: true,
        default: false
    },
    alerta:{
        type: Boolean,
        require: true,
        default: false
    },
    parada:{
        type: Boolean,
        require: true,
        default: true
    }
})

const model = mongoose.model('ativo', ativoSchema)

module.exports = model