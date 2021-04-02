import React,{useState} from 'react'
import NavBar from '../Menu/NavBar'
import Footer from '../Footer/Footer'
import axios from 'axios'

export default props=>{
    const [nomeEmpresa, setNomeEmpresa]= useState()
    const [endereco, setEndereco] = useState()
    const [idUnidade,setIdUnidade] = useState([])
    const [error, setError] = useState('')

    const CadastrarEmpresa = ()=>{
        axios.post("https://empresaapi.herokuapp.com/app/empresa", {
            nome: nomeEmpresa, 
            endereco: endereco, 
            unidade: idUnidade}).then((item)=>{
            console.log(item)
        }).catch((err)=>{
            console.log(err)
        })
    }

    async function HandlePost(e){
        e.preventDefault()
        try{
            setError('Cadastrado com sucesso!')
            await CadastrarEmpresa()
        }catch{
            setError('Erro ao Cadastrar !')
        }
    }

    const HandleNomeEmpresa = (e)=>{
        setNomeEmpresa(e.target.value)
    }
    const HandleEndereco = (e)=>{
        setEndereco(e.target.value)
    }

    const HandleIdUnidade = (e)=>{
        setIdUnidade(e.target.value)
    }

    return(
        <div>
            <NavBar></NavBar>
            <div>
            <h1>CADASTRAR EMPRESA</h1>
            <form onSubmit={HandlePost}>
                <div className="form-group">
                    <label>Nome da Empresa</label>
                    <input type="text" className="form-control" placeholder="Digite o nome da empresa" onChange={HandleNomeEmpresa}></input>
                </div>
                <div className="form-group">
                    <label>Endereço</label>
                    <input type="text" className="form-control" placeholder="Digite o endereço da empresa" onChange={HandleEndereco}></input>
                </div>
                <div className="form-group">
                    <label>Cadastre as Unidades da empresa (ID)</label>
                    <input type="text" className="form-control" placeholder="Digite o ID da Unidade" onChange={HandleIdUnidade}></input>
                </div>
                <div className="alert alert-warning" role="alert">
                    <h1>{error}</h1>
                </div>
                <button type="submit" className="btn btn-primary">Cadastrar</button>
            </form>
            </div>
            <Footer></Footer>
        </div>
    )
}