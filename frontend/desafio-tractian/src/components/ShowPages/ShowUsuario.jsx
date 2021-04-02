import React, {useEffect, useState} from 'react'
import NavBar from '../Menu/NavBar'
import Footer from '../Footer/Footer'
import axios from 'axios'
import '../../Syled/ShowUsuario.css'
import { useHistory } from 'react-router'

export default props=>{
    const [ativo, setAtivo] = useState([])
    const [nome ,setNome] = useState();
    const [cargo, setCargo] = useState();
    const [email, setEmail] = useState();
    const [idEmpresa, setIdEmpresa] = useState();
    const history = useHistory()

    useEffect(()=>{
        axios.get("https://empresaapi.herokuapp.com/app/usuario").then((item)=>{
            setAtivo(item.data)
            console.log(item.data)
        }).catch((err)=>{
            console.log(err)
        })
    },[])
    
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
            <h1>USUARIOS</h1>
            <div>
                {ativo.map((res)=>{
                    return(
                        <div className="card" id="Card">
                            <div className="card-body">
                                <h5 className="card-title">{res.nome}</h5>
                                <h6 className="card-subtitle mb-2 text-muted">Id: {res._id}</h6>
                                <p className="card-text">Cargo: {res.cargo}</p>
                                <p className="card-text">E-mail: {res.email}</p>
                                {res.empresa !== undefined || null ? res.empresa.map((item)=>{return(
                                    <div>
                                        <div class="card" id="CardEmpresa">
                                            <h4>Empresa:</h4>
                                            <div class="card-body">
                                                <h5 class="card-title">{item.nome}</h5>
                                                <h6 class="card-subtitle mb-2 text-muted">Id: {item._id}</h6>
                                                <p class="card-text">Endereço: {item.endereco}</p>
                                            </div>
                                        </div>
                                    </div>
                                )}) : 'Unidade: Nenhuma unidade cadastrada'}
                            </div>
                            <button type="button" class="btn btn-primary" data-toggle="modal" data-target={`#target-${res._id}`}>Editar</button>
                            <div class="modal fade" id={`target-${res._id}`} tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                                <div class="modal-dialog" role="document">
                                    <div class="modal-content">
                                        <div class="modal-header">
                                            <h5 class="modal-title" id="exampleModalLabel">Editar</h5>
                                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                                <span aria-hidden="true">&times;</span>
                                            </button>
                                        </div>
                                        <div class="modal-body">
                                            <form>
                                                <label>Nome:</label><br></br>
                                                <input type="text" onChange={HandleNome}></input><br></br>
                                                <label>Cargo:</label><br></br>
                                                <input type="text" onChange={HandleCargo}></input><br></br>
                                                <label>Email:</label><br></br>
                                                <input type="text" onChange={HandleEmail}></input><br></br>
                                                <label>ID da Empresa:</label><br></br>
                                                <input type="text" onChange={HandleIdEmpresa}></input><br></br>
                                            </form>
                                        </div>
                                        <div class="modal-footer">
                                            <button type="button" class="btn btn-primary" onClick={async ()=>{
                                                await axios.put(`https://empresaapi.herokuapp.com/app/usuario/${res._id}`, {nome: nome, cargo: cargo, email: email, empresa: idEmpresa})
                                                history.go(0)
                                            }}>Salvar Mudanças</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <button type="button" class="btn btn-danger" onClick={async ()=>{
                                await axios.delete(`https://empresaapi.herokuapp.com/app/usuario/${res._id}`)
                                history.go(0)
                                }}>Deletar</button>
                        </div>
                    )
                })}        
            </div>
            <Footer></Footer>
        </div>
    )
}