import React, {useEffect, useState} from 'react'
import NavBar from '../Menu/NavBar'
import Footer from '../Footer/Footer'
import axios from 'axios'
import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'
import '../../Syled/ShowAtivo.css'
import { useHistory } from 'react-router'
 
 
export default props=>{
    const [ativo, setAtivo] = useState([])
    const [imagem,setImagem] = useState();
    const [nomeAtivo ,setNomeAtivo] = useState();
    const [descricao, setDescricao] = useState();
    const [modelo, setModelo] = useState();
    const [nivelSaude, setNivelSaude] = useState();
    const [idResponsavel, setIdResponsavel] = useState();
    const history = useHistory()
 
    useEffect(()=>{
        axios.get("https://empresaapi.herokuapp.com/app/ativo").then((item)=>{
            setAtivo(item.data)
            console.log(item.data)
        }).catch((err)=>{
            console.log(err)
        })
    }, [])

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
            <h1>ATIVOS</h1>
            <div className="AtivoPrincipal">

                {ativo.map((res)=>{
                    const saude = res.saudenv
                    const options= {
                        chart: {
                            type: 'pie'
                        },
                    
                        title: {
                            text: 'NIVEL DE SAÚDE'
                        },
                    
                        tooltip: {
                            valueSuffix: '%',
                            borderColor: '#8ae'
                        },
                    
                        plotOptions: {
                            series: {
                                dataLabels: {
                                    enabled: true,
                                    connectorColor: '#777',
                                    format: '<b>{point.name}</b>: {point.percentage:.1f} %'
                                },
                                cursor: 'pointer',
                                borderWidth: 3
                            }
                        },
                        series: [{
                            name: 'Nivel de saúde em %',
                            data: [{
                                name: 'Nivel de Saude Positivo',
                                y: saude,
                                color: '#15A742',
                            },{
                                name: 'Nivel de Saude Negativo',
                                y: 100 - saude,
                                color: '#D6E0F0'
                            }]
                        }],
                        responsive: {
                            rules: [{
                                condition: {
                                    maxWidth: 500
                                }
                            }]
                        }
                    }
                    return(
                        <div className="card" id="Card">
                            <div className="card-body">
                                <h5 className="card-title">{res.nome}</h5>
                                <h6 className="card-subtitle mb-2 text-muted">Id: {res._id}</h6>
                                <p className="card-text">Descrição: {res.descricao}</p>
                                <p className="card-text">Modelo: {res.modelo}</p>
                                {res.usuario !== undefined || null ? res.usuario.map((item)=>{return(
                                    <div>
                                        <div class="card" id="CardResponsavel">
                                        <h4>Responsável:</h4>
                                            <div class="card-body">
                                                <h5 class="card-title">{item.nome}</h5>
                                                <h6 class="card-subtitle mb-2 text-muted">Id: {item._id}</h6>
                                                <p class="card-text">Cargo: {item.cargo}</p>
                                            </div>
                                        </div> 
                                    </div>
                                )}) : 'Responsável: Nenhum responsável cadastrado'}
                                {res.operacao ? 
                                    <div class="alert alert-success" role="alert">
                                        <p>SITUAÇÃO: Em operação</p>
                                    </div>
                                : false}
 
                                {res.parada ? 
                                    <div class="alert alert-warning" role="alert">
                                        <p>SITUAÇÃO: Parado</p>
                                    </div>
                                : false}
 
                                {res.alerta ? 
                                    <div class="alert alert-danger" role="alert">
                                        <p>SITUAÇÃO: Em alerta !</p>
                                    </div>
                                : false}
                                <p>
                                    <button id="alertbtn" class="btn btn-dark" type="button"  onClick={()=>{axios.put(`https://empresaapi.herokuapp.com/app/ativo/${res._id}`, {operacao: true, parada: false, alerta: false}).then((item)=>{history.go(0)})}}>
                                        Em operação
                                    </button> 
                                    <button id="alertbtn" class="btn btn-dark" type="button"  onClick={()=>{axios.put(`https://empresaapi.herokuapp.com/app/ativo/${res._id}`, {operacao: false, parada: false, alerta: true}).then((item)=>{history.go(0)})}}>
                                        Em alerta
                                    </button>
                                    <button id="alertbtn" class="btn btn-dark" type="button"  onClick={()=>{axios.put(`https://empresaapi.herokuapp.com/app/ativo/${res._id}`, {operacao: false, parada: true, alerta: false}).then((item)=>{history.go(0)})}}>
                                        Parado
                                    </button>    
                                </p>
                                <p>
                                    <button class="btn btn-secondary" type="button" data-toggle="collapse" data-target={`#target-${res._id}`} aria-expanded="false" aria-controls="collapseExample">
                                        Nivel de Saude
                                    </button>
                                </p>
                                <div class="collapse" id={`target-${res._id}`}>
                                    <div class="card card-body">
                                        <HighchartsReact highcharts={Highcharts} options={options}/>
                                    </div>
                                </div>
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
                                                <label>Imagem:</label><br></br>
                                                <input type="text" onChange={HandleImagem}></input><br></br>
                                                <label>Nome do Ativo:</label><br></br>
                                                <input type="text" onChange={HandleNomeAtivo}></input><br></br>
                                                <label>Descrição do Ativo:</label><br></br>
                                                <input type="text" onChange={HandleDescricao}></input><br></br>
                                                <label>Modelo:</label><br></br>
                                                <input type="text" onChange={HandleModelo}></input><br></br>
                                                <label>Responsável pelo Ativo (Insira o ID do Funcionario):</label><br></br>
                                                <input type="text" onChange={HandleIdResponsavel}></input><br></br>
                                                <label>Nivel de Saude (Não precisa usar o simbolo %, use numeros inteiros)</label><br></br>
                                                <input type="text" onChange={HandleNivelSaude}></input><br></br>
                                            </form>
                                        </div>
                                        <div class="modal-footer">
                                            <button type="button" class="btn btn-primary" onClick={async ()=>{
                                                await axios.put(`https://empresaapi.herokuapp.com/app/ativo/${res._id}`, {imagem: imagem, nome: nomeAtivo, descricao: descricao, modelo: modelo, usuario: idResponsavel, saudenv: nivelSaude})
                                                history.go(0)
                                            }}>Salvar Mudanças</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <button type="button" class="btn btn-danger" onClick={async ()=>{
                                    await axios.delete(`https://empresaapi.herokuapp.com/app/ativo/${res._id}`)
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