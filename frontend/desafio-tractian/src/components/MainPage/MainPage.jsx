import React from 'react'
import {Link} from 'react-router-dom'
import NavBar from '../Menu/NavBar'
import Footer from '../Footer/Footer'
import '../../Syled/MainPage.css'

export default (props)=>{
    return(
        <div className="Principal">
            <NavBar></NavBar>
            <div className="MainPage">
                <Link to="/CadastroEmpresa"><h1>Cadastrar Empresa</h1></Link>
                <hr/>
                <Link to="/CadastroUsuario"><h1>Cadastrar Usuario</h1></Link>
                <hr/>
                <Link to="/CadastroUnidade"><h1>Cadastrar Unidade</h1></Link>
                <hr/>
                <Link to="/CadastroAtivo"><h1>Cadastrar Ativo</h1></Link>
            </div>
            <Footer></Footer>
        </div>
    )
}