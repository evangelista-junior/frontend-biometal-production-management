import React, {useEffect, useState} from 'react';
import './index.css';
import UpdateIcon from '../../images/update-icon.png';
import TrashIcon from '../../images/trash-icon.png';
import Api from '../../Api';

const formatTime = (time: String) =>{
  if (time != null){
    return `${time.slice(0,2)}:${time.slice(2,4)}`}
  else{ return time}
}

const ExpedienteConfig: React.FC = () => {
  const [rotinasExpedientes, setRotinasExpedientes] = useState([])

  const updateExpediente = (e) => {
    e.preventDefault()
    let codRotina = e.currentTarget.parentNode.parentNode.parentNode.id
    let inicio = document.getElementById(`INICIO_${codRotina}`).value.replace(':', '')
    let fim = document.getElementById(`FIM_${codRotina}`).value.replace(':', '')
    
    if(inicio != '' & fim != ''){
      Api.post('/alterar-horario-expediente', {
        CODROTINA: codRotina,
        INICIOEXPEDIENTE: inicio,
        FIMEXPEDIENTE: fim,
      })
      alert('Alteração realizada com sucesso !!!')
    }else{
      alert(`Por favor preencha os dados de início e fim de expediente corretamente !!!`)
    }
  }

  const updateTempoEspera = (e) => {
    e.preventDefault()
    let codRotina = e.currentTarget.parentNode.parentNode.parentNode.id
    let tempoEspera = document.getElementById(`TEMPOESPERA_${codRotina}`).value.replace(':', '')
    
    Api.post('/alterar-tempo-espera', {
        CODROTINA: codRotina,
        TEMPOLIMITEESPERA: tempoEspera,
      })
    alert('Alteração realizada com sucesso !!!')
  }

  const deleteTempoEspera = (e) => {
    e.preventDefault()
    let codRotina = e.currentTarget.parentNode.parentNode.parentNode.id

  
    Api.post('/alterar-tempo-espera', {
      CODROTINA: codRotina,
      TEMPOLIMITEESPERA: null
    })
    document.getElementById(`TEMPOESPERA_${codRotina}`).value = ''
    
    Api.get('/configuracoes-expedientes').then(response =>{
      setRotinasExpedientes(response.data)
    })
    alert('Alteração realizada com sucesso !!!')
  }
  
  useEffect(()=>{
    Api.get('/configuracoes-expedientes').then(response =>{
      setRotinasExpedientes(response.data)
    })
  }, [])

  return (
    <div className="campo--config">
      <h1>HORÁRIO DE EXPEDIENTE POR PROCESSO</h1>
      
      <div className="rotinasConfig">
        {
          rotinasExpedientes.length > 0 && rotinasExpedientes.map((rotina) =>(
              <div className="campo--configSingle" id={rotina.CODROTINA}>
              <h3>{rotina.NOMEROTINA}</h3>
              <h4 style={{'paddingTop': '8px'}}>Horário Expediente</h4>
              <div className="expediente--configs">
                <div className="parametros--hora">
                  <input type="time" id={`INICIO_${rotina.CODROTINA}`} defaultValue={formatTime(rotina.INICIOEXPEDIENTE)}/>
                  <p>até</p>
                  <input type="time" id={`FIM_${rotina.CODROTINA}`} defaultValue={formatTime(rotina.FIMEXPEDIENTE)}/>
                </div>
                <div className="campo--configButtons">
                  <div className="configButton--updateProcess" onClick={(e)=>updateExpediente(e)}>
                    <a href="/configuracoes"><img src={UpdateIcon} alt="" /></a>
                  </div>
                </div>
              </div>

              <h4>Tempo de Espera</h4>
              <div className="tempoEspera--configs">
                <div className="parametros--hora">
                  <input type="time" id={`TEMPOESPERA_${rotina.CODROTINA}`} defaultValue={formatTime(rotina.TEMPOLIMITEESPERA)}/>
                  <p>hh:mm</p>
                </div>
                <div className="campo--configButtons">
                  <div className="configButton--updateProcess" onClick={(e)=>updateTempoEspera(e)}>
                    <a href="/configuracoes"><img src={UpdateIcon} alt="" /></a>
                  </div>
                  <div className="configButton--deleteProcess" onClick={(e)=>deleteTempoEspera(e)}>
                    <a href="/configuracoes"><img src={TrashIcon} alt="" /></a>
                  </div>
                </div>
              </div>
            </div>  
          ))
        }
      </div>
    </div>
  );
}

export default ExpedienteConfig;