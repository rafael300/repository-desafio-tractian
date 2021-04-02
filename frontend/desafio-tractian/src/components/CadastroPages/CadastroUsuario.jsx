import React, {useState} from 'react'
import NavBar from '../Menu/NavBar'
import Footer from '../Footer/Footer'
import axios from 'axios'

export default props=>{
    const [nome ,setNome] = useState();
    const [cargo, setCargo] = useState();
    const [email, setEmail] = useState();
    const [idEmpresa, setIdEmpresa] = useState();
    const [error, setError] = useState('')

    const CadastrarUsuario = ()=>{
        axios.post("https://empresaapi.herokuapp.com/app/usuario", {
            nome: nome, 
            cargo: cargo, 
            email: email, 
            empresa: idEmpresa}).then((item)=>{
            console.log(item)
        }).catch((err)=>{
            console.log(err)
        })
    }

    async function HandlePost(e){
        e.preventDefault()
        try{
            setError('Cadastrado com Sucesso!')
            await CadastrarUsuario()
        }catch{
            setError('Erro ao Cadastrar!')
        }
    }

    const HandleNome = (e)=>{
        setNome(e.target.value)
    }
    const HandleCargo = (e)=>{
        setCargo(e.target.value)
    }
    const HandleEmail = (e)=>{
        setEmail(e.target.value)
    }
    const HandleIdEmpresa = (e)=>{
        setIdEmpresa(e.target.value)
    }

    return(
        <div>
            <NavBar></NavBar>
            <div>
            <h1>CADASTRAR USUARIO</h1>
            <form onSubmit={HandlePost}>
                <div class="form-group">
                    <label for="exampleInputEmail1">Nome</label>
                    <input type="text" class="form-control" onChange={HandleNome} placeholder="Digite o seu nome"/>
                </div>
                <div class="form-group">
                    <label for="exampleInputPassword1">Cargo</label>
                    <input type="text" class="form-control" onChange={HandleCargo} placeholder="Digite o cargo que ocupa"/>
                </div>
                <div class="form-group">
                    <label for="exampleInputPassword1">E-mail</label>
                    <input type="text" class="form-control" onChange={HandleEmail} placeholder="Digite o seu e-mail"/>
                </div>
                <div class="form-group">
                    <label for="exampleInputPassword1">ID da Empresa</label>
                    <input type="text" class="form-control" onChange={HandleIdEmpresa} placeholder="Digite a empresa em que trabalha"/>
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