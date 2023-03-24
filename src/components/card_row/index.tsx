import { useState, useEffect } from 'react';
import './index.css';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';

interface ComponentProps {
  nomeProcesso: string;
  opsProcesso: Array<string | number>;
  codRotina: number;
  changeMarginSearchOp: (string | number)[];
  specialLayout?: boolean;
  programadoRealizado: Array<number>;
}

function Card_row({ nomeProcesso, opsProcesso, codRotina, changeMarginSearchOp, specialLayout, programadoRealizado }: ComponentProps) {
  const [scrollX, setScrollX] = useState(0)
  const [rotinaOpProc, setRotinaOpProc] = changeMarginSearchOp
  const cardWidth = -280

  const formatDateTime = (date: string) =>{
    if (date == null){return 'Invalid Date'}else{
    return new Date(date).toLocaleDateString('pt-BR', {
      hour: 'numeric',
      minute: 'numeric',
    })}
  }

  const formatDate = (date: string) =>{
    return new Date(date).toLocaleDateString('pt-BR', )
  }

  const calculateWaitTime = (dataInicio: Date, dataFinalAnterior: null | string) =>{
    let timeDiff = (new Date(dataInicio) - new Date(dataFinalAnterior)) /1000
    let diasDiff = Math.floor(timeDiff / 60 / 60 / 24)
    let hourDiff = ('00' + Math.floor(timeDiff / 60 / 60 % 24)).slice(-2)
    let minDiff =  ('00' + Math.floor(timeDiff / 60 % 60)).slice(-2)
    let secDiff =  ('00' + Math.floor(timeDiff % 60)).slice(-2)
    return `${diasDiff}(d) - ${hourDiff}:${minDiff}:${secDiff}`
  }

  const navigateLeft = () => {
    let x = scrollX + Math.round(window.innerWidth / 2);
    if(x >0){
        x = 0;
    }
    setScrollX(x)
}

const navigateRight = () => {
    let x = scrollX - Math.round(window.innerWidth / 2);
    let listWidth = opsProcesso.length * cardWidth
    
    if (-listWidth > window.innerWidth){
      if(listWidth - (-1*window.innerWidth) > x){
          x = (window.innerWidth - (-1*listWidth)) - 60
      }
      setScrollX(x)
    }
}

  useEffect(()=>{
    if (opsProcesso != undefined && rotinaOpProc === codRotina){
      const el = document.getElementById(String(rotinaOpProc))?.getElementsByClassName('card--listarea')[0]
      setScrollX(parseInt(el?.style.marginLeft))
      setRotinaOpProc(null)
    }
  })

  if (opsProcesso != undefined && opsProcesso.length > 0) {

    return (
    <div className='cardrow' id={codRotina}>
      <h1>{nomeProcesso} <span>{programadoRealizado[1]}/{programadoRealizado[0]} ({programadoRealizado[2]}%)</span></h1>

      <div className="navigate--left" onClick={navigateLeft}>
        <NavigateBeforeIcon style={{ 'fontSize': 50 }} />
      </div>
      <div className="navigate--rigth" onClick={navigateRight}>
        <NavigateNextIcon style={{ 'fontSize': 50 }} />
      </div>

      <div className="card--listarea" style={{
        'marginLeft': scrollX
      }}>
        {opsProcesso.length > 0 && opsProcesso.map((infoOpSingle, i) => {
          let qtde = infoOpSingle[6]
          let disponivelDesde = formatDateTime(infoOpSingle[12])
          let dataInicio = formatDateTime(infoOpSingle[3])
          let dataTermino = formatDateTime(infoOpSingle[4])
          let dataProgramada = formatDate(infoOpSingle[15])
          let status = infoOpSingle[16]
                    
          let tempoConcluido = calculateWaitTime(new Date(), infoOpSingle[4]) 
          let usuario = infoOpSingle[11]
          if(usuario.length > 27){usuario = usuario.substring(0, 27) + '...'}
          
          return (
          <div className={"card--single " + status} id={infoOpSingle[0]} 
          style={{'flex':`0 0 ${cardWidth * -1}px`}}>
            <h1>{infoOpSingle[0]}/{infoOpSingle[1]}</h1>
            <p><span>{infoOpSingle[13]}</span> - {infoOpSingle[14]}</p>
            <p><span>Data programada:<br/></span> {dataProgramada}</p>
            {
              status === 'status--processo' &&
              <div className="process--orderInfo">
                <p><span>Máquina:<br/></span>{infoOpSingle[8]}</p>
                <p><span>Data de início:<br /></span>{dataInicio}</p>
              </div>
            }
            <p><span>Quantidade:<br /></span>{qtde}</p>
            {
            dataTermino != 'Invalid Date' &&
            (
              <div className="concluded--orderInfo">
                <p><span>Término operação anterior:<br /></span>{dataTermino}</p>
                <p><span>Disponível a:<br /></span>{tempoConcluido}</p>
              </div>
            )}
            <p><span>Usuário:<br /></span>{usuario}</p>
          </div>
        )})}

      </div>
    </div>

  )}else if (specialLayout){
    return (
    <div className='cardrow' id={codRotina} style={{'height': '100px'}}>
      <h1>{nomeProcesso} <span>{programadoRealizado[1]}/{programadoRealizado[0]} ({programadoRealizado[2]}%)</span></h1>
    </div>)
  }
}

export default Card_row;