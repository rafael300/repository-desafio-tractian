import React, {useEffect, useState} from 'react'
import NavBar from '../Menu/NavBar'
import Footer from '../Footer/Footer'
import axios from 'axios'
import '../../Syled/ShowEmpresa.css'
import {useHistory} from 'react-router-dom'

export default props=>{
    const [ativo, setAtivo] = useState([])
    const [nomeEmpresa, setNomeEmpresa]= useState()
    const [endereco, setEndereco] = useState()
    const [idUnidade,setIdUnidade] = useState()
    const history = useHistory()

    useEffect(()=>{
        axios.get("https://empresaapi.herokuapp.com/app/empresa").then((item)=>{
            setAtivo(item.data)
            console.log(item.data)
        }).catch((err)=>{
            console.log(err)
        })
    }, [])
    
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
            <h1>EMPRESA</h1>
            <div>
            {ativo.map((res)=>{
                return(
                    <div class="card" id="Card">
                        <div class="card-body">
                            <h5 class="card-title">{res.nome}</h5>
                            <h6 class="card-subtitle mb-2 text-muted">Id: {res._id}</h6>
                            <p class="card-text">Endereço: {res.endereco}</p>
                            {res.unidade !== undefined ? res.unidade.map((item)=>{
                                    return(
                                        <div>
                                            <div class="card" id="CardUnidade">
                                            <h4>Unidades:</h4>
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
                                            <label>Nome da Empresa:</label><br></br>
                                            <input type="text" onChange={HandleNomeEmpresa}></input><br></br>
                                            <label>Endereço:</label><br></br>
                                            <input type="text" onChange={HandleEndereco}></input><br></br>
                                            <label>ID da Unidade:</label><br></br>
                                            <input type="text" onChange={HandleIdUnidade}></input><br></br>
                                        </form>
                                    </div>
                                    <div class="modal-footer">
                                        <button type="button" class="btn btn-primary" onClick={async ()=>{
                                            await axios.put(`https://empresaapi.herokuapp.com/app/empresa/${res._id}`, {nome: nomeEmpresa, endereco: endereco, unidade: idUnidade})
                                            history.go(0)
                                        }}>Salvar Mudanças</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <button type="button" class="btn btn-danger" onClick={async ()=>{
                                await axios.delete(`https://empresaapi.herokuapp.com/app/empresa/${res._id}`)
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