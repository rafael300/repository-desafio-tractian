import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import {Route, BrowserRouter, Switch} from 'react-router-dom'
import CadastroEmpresa from './components/CadastroPages/CadastroEmpresa'
import CadastroUsuario from './components/CadastroPages/CadastroUsuario'
import CadastroUnidade from './components/CadastroPages/CadastroUnidade'
import CadastroAtivo from './components/CadastroPages/CadastroAtivo'
import ShowEmpresa from './components/ShowPages/ShowEmpresa'
import ShowUsuario from './components/ShowPages/ShowUsuario'
import ShowUnidade from './components/ShowPages/ShowUnidade'
import ShowAtivo from './components/ShowPages/ShowAtivo'

ReactDOM.render(
  <BrowserRouter>
    <Switch>
      <Route path="/" exact= "true" component={App}/>
      <Route path="/CadastroEmpresa" component={CadastroEmpresa}/>
      <Route path="/CadastroUsuario" component={CadastroUsuario}/>
      <Route path="/CadastroUnidade" component={CadastroUnidade}/>
      <Route path="/CadastroAtivo" component={CadastroAtivo}/>
      <Route path="/ShowEmpresa" component={ShowEmpresa}/>
      <Route path="/ShowUsuario" component={ShowUsuario}/>
      <Route path="/ShowUnidade" component={ShowUnidade}/>
      <Route path="/ShowAtivo" component={ShowAtivo}/>
    </Switch>
  </BrowserRouter>,
  document.getElementById('root')
);
