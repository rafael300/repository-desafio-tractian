import React from 'react'
import {Link} from 'react-router-dom'
import logo from '../../img/logo.jpg'

export default props=>{
    return(
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <Link className="navbar-brand" to="/"><img src={logo}/></Link>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <Link className="nav-link" to="/ShowEmpresa">Empresas<span className="sr-only">(current)</span></Link>
                <Link className="nav-link" to="/ShowUsuario">Usuarios<span className="sr-only">(current)</span></Link>
                <Link className="nav-link" to="/ShowUnidade">Unidades<span className="sr-only">(current)</span></Link>
                <Link className="nav-link" to="/ShowAtivo">Ativos<span className="sr-only">(current)</span></Link>
            </div>
        </nav> 
    )
}
