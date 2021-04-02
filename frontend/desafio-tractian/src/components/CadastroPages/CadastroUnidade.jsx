import React,{useState} from 'react'
import NavBar from '../Menu/NavBar'
import Footer from '../Footer/Footer'
import axios from 'axios'

export default props=>{
    const [nomeUnidade, setNomeUnidade] = useState();
    const [endereco, setEndereco] = useState();
    const [idFuncionario, setIdFuncionario] = useState();
    const [idAtivo, setIdAtivo] = useState();
    const [error, setError] = useState('')

    const CadastrarUnidade = ()=>{
        axios.post("https://empresaapi.herokuapp.com/app/unidade", {
            nome: nomeUnidade, 
            endereco: endereco, 
            ativo: idAtivo}).then((item)=>{
            console.log(item)
        }).catch((err)=>{
            console.log(err)
        })
    }
    async function HandlePost(e){
        e.preventDefault()
        try{
            setError('Cadastrado com Sucesso!')
            await CadastrarUnidade()
        }catch{
            setError('Erro ao Cadastrar !')
        }
    }

    const HandleNomeUnidade = (e)=>{
        setNomeUnidade(e.target.value)
    }
    const HandleEndereco = (e)=>{
        setEndereco(e.target.value)
    }
    const HandleIdAtivo = (e)=>{
        setIdAtivo(e.target.value)
    }


    return(
        <div>
            <NavBar></NavBar>
            <div>
            <h1>CADASTRAR UNIDADE</h1>
            <form onSubmit={HandlePost}>
                <div class="form-group">
                    <label>Nome da Unidade</label>
                    <input type="text" class="form-control" onChange={HandleNomeUnidade} placeholder="Digite o nome da unidade"/>
                </div>
                <div class="form-group">
                    <label>Endereco da Unidade</label>
                    <input type="text" class="form-control" onChange={HandleEndereco} placeholder="Digite o endereço da unidade"/>
                </div>
                <div class="form-group">
                    <label>Cadastre o ativo da Unidade (ID)</label>
                    <input type="text" class="form-control" onChange={HandleIdAtivo} placeholder="Digite o id do ativo"/>
                </div>
                <div className="alert alert-warning" role="alert">
                    <h1>{error}</h1>
                </div>
                <button type="submit" class="btn btn-primary">Cadastrar</button>
            </form>
            </div>
            <Footer></Footer>
        </div>
    )
}