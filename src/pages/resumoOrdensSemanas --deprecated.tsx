import React, { useEffect, useState } from 'react';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import Api from '../Api';
import $ from 'jquery';

const convertDate = (date) => {
  return new  Date(date).toLocaleDateString('pt-BR');
}

const showDescription = (description) => {
  let limit = 40
  if (description.length > limit) {
    return description.slice(0, limit) + '...'
  }
  else return description
}

const ResumoOrdens: React.FC = () => {
  const [semanas, setSemanas] = useState(null)
  const [opsPorSemana, setOpsPorSemana] = useState({})

  useEffect(()=>{
    Api.get('/semanas-ordens-producao').then((response) => {
      setSemanas(response.data)
    })
  },[])

  const SetOps = (semana) => {
    return new Promise(async (resolve, reject) => {
    await Api.post('/resumo-ordens-producao', {
        SEMANA: semana.split('-')[0],
        ANO: semana.split('-')[1]
      }).then((response) => {
        resolve(setOpsPorSemana({...opsPorSemana, ...response.data}))
      })
    })
  }

  const showInfoSemana = async (e) =>{
    e.preventDefault()
    let semana = e.currentTarget.parentNode.parentNode.id

    if(Object.keys(opsPorSemana).includes(semana) === false){
    await SetOps(semana)}

    $(`#${semana} #showInfo`).css('display', 'none')
    $(`#${semana} #hideInfo`).css('display', 'flex')
    $(`#${semana} .single--content`).css('display', 'flex')
  }

  const hideInfoSemana = (e)=>{
    e.preventDefault()
    let semana = e.currentTarget.parentNode.parentNode.id
    $(`#${semana} .single--content`).css('display', 'none')
    $(`#${semana} #showInfo`).css('display', 'flex')
    $(`#${semana} #hideInfo`).css('display', 'none')
  }

  return (
    <div>
      <div className="resumo--list">

        {
          semanas != null && semanas.map((semana)=>(
            <div className="resumo--single" id={semana[0]}>

              <div className="single--week">
                <h3>semana {semana[0]}</h3>
                <p>{semana[3]} pçs - {convertDate(semana[1])} - {convertDate(semana[2])}</p>
                < AddCircleIcon id='showInfo' style={{
                  'fill': '#ccc',
                  'cursor': 'pointer'
                }} onClick={(e)=>showInfoSemana(e)}/>
                < RemoveCircleIcon id='hideInfo' style={{
                  'fill': '#ccc',
                  'cursor': 'pointer',
                  'display': 'none'
                }} onClick={(e)=>hideInfoSemana(e)}/>
              </div>
              
              <div className="single--content">
                <div className="op--content">
                  <div className="content--title">
                      <h4 className='op'>Nº O.P.</h4>
                  </div>
                </div>
                
                <div className="codProduto--content">
                  <div className="content--title">
                    <h4 className='codproduto'>Produto</h4>
                  </div>
                </div>
                
                <div className="descricao--content">
                  <div className="content--title">
                    <h4 className='descricao'>Descrição</h4>
                  </div>
                </div>
                
                <div className="qtde--content">
                  <div className="content--title">
                    <h4 className='qtde'>Programado</h4>
                  </div>
                </div>
                
                <div className="data--content">
                  <div className="content--title">
                    <h4 className='data'>Data Programada</h4>
                  </div>
                </div>
              </div>
            {
              Object.keys(opsPorSemana).length > 0 && Object.keys(opsPorSemana).includes(semana[0]) ?
              opsPorSemana[semana[0]].map((info)=>{
              return (
                <div className="single--content single--content--values" style={{'display':'flex'}}>

                  <div className="op--content">
                    <div className="content--values">
                      <p className='op'>{info[0]}</p>
                    </div>
                  </div>
      
                  <div className="codProduto--content">
                    <div className="content--values">
                      <p>{info[1]}</p>
                    </div>
                  </div>
      
                  <div className="descricao--content">
                    <div className="content--values">
                      <p>{showDescription(info[2])}</p>
                    </div>
                  </div>
      
                  <div className="qtde--content">
                    <div className="content--values">
                      <p>{info[3]}</p>
                    </div>
                  </div>
      
                  <div className="data--content">
                    <div className="content--values">
                      <p>{convertDate(info[4])}</p>
                    </div>
                  </div>          
                </div>
              )})
              : ''
            }
            </div>
          ))
        }
      </div>
    </div>
  );
}

export default ResumoOrdens;