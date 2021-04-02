import React,{useState} from 'react'
import NavBar from '../Menu/NavBar'
import Footer from '../Footer/Footer'
import axios from 'axios'

export default props=>{
    const [imagem,setImagem] = useState();
    const [nomeAtivo ,setNomeAtivo] = useState();
    const [descricao, setDescricao] = useState();
    const [modelo, setModelo] = useState();
    const [idResponsavel, setIdResponsavel] = useState();
    const [nivelSaude, setNivelSaude] = useState();
    const [error, setError] = useState('')

    const CadastrarAtivo = ()=>{
        axios.post("https://empresaapi.herokuapp.com/app/ativo", {
            imagem: imagem, 
            nome: nomeAtivo, 
            descricao: descricao, 
            modelo: modelo,
            usuario: idResponsavel, 
            saudenv: nivelSaude}).then((item)=>{
            console.log(item)
        }).catch((err)=>{
            console.log(err)
        })
    }

    async function HandlePost(e){
        e.preventDefault()
        try{
            setError('Cadastrado com Sucesso!')
            await CadastrarAtivo()
        }catch{
            setError('Erro ao Cadastrar !')
        }
    }

    const HandleImagem = (e)=>{
        setImagem(e.target.value)
    }
    const HandleNomeAtivo = (e)=>{
        setNomeAtivo(e.target.value)
    }
    const HandleDescricao = (e)=>{
        setDescricao(e.target.value)
    }
    const HandleModelo = (e)=>{
        setModelo(e.target.value)
    }
    const HandleIdResponsavel = (e)=>{
            setIdResponsavel(e.target.value)
    }
    const HandleNivelSaude = (e)=>{
        setNivelSaude(e.target.value)
    }


    return(
        <div>
            <NavBar></NavBar>
            <div>
            <h1>CADASTRAR ATIVO</h1>
            <form onSubmit={HandlePost}>
                <div class="form-group">
                    <label for="exampleInputEmail1">Imagem</label>
                    <input type="text" class="form-control" onChange={HandleImagem} placeholder="insira a imagem"></input>
                </div>
                <div class="form-group">
                    <label for="exampleInputPassword1">Nome do Ativo</label>
                    <input type="text" class="form-control" onChange={HandleNomeAtivo} placeholder="Digite o nome do Ativo"></input>
                </div>
                <div class="form-group">
                    <label for="exampleInputPassword1">Descrição do Ativo</label>
                    <input type="text" class="form-control" onChange={HandleDescricao} placeholder="Digite a descrição do Ativo"></input>
                </div>
                <div class="form-group">
                    <label for="exampleInputEmail1">Modelo</label>
                    <input type="text" class="form-control" onChange={HandleModelo} placeholder="Digite o nome do modelo"></input>
                </div>
                <div class="form-group">
                    <label for="exampleInputPassword1">Responsável pelo Ativo (Insira o ID do Funcionario)</label>
                    <input type="text" class="form-control" onChange={HandleIdResponsavel} placeholder="Digite o nome completo do resposavel"></input>
                </div>
                <div class="form-group">
                    <label for="exampleInputPassword1">Nivel de Saude (Não precisa usar o simbolo %, use numeros inteiros)</label>
                    <input type="number" class="form-control" onChange={HandleNivelSaude} placeholder="Digite o Nivel de saude da unidade em porcentagem"></input>
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