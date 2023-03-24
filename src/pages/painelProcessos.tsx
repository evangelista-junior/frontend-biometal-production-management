import { useState, useEffect, useRef } from 'react';
import SearchIcon from '@mui/icons-material/Search';
import Card_row from '../components/card_row';
import Api from '../Api';
import $ from 'jquery';


const dateTarget = () => {
  let currentDate = new Date()

  let dafOfWeek = currentDate.getDay() 
  let diffDayOfWeek = 5 - dafOfWeek
  if (diffDayOfWeek <0){diffDayOfWeek+= 7}
  let target = new Date(currentDate.getTime() + (diffDayOfWeek * 24 * 60 * 60 * 1000))
  
  return `${target.getFullYear()}-${('0'+(target.getMonth()+1)).slice(0,2)}-${('0'+target.getDate()).slice(-2)}`;
}

export default function PainelProcessos() {
  // TODO: Smoth scroll - TV visualization
  const [processos, setProcessos] = useState(null);
  const [rotinas, setRotinas] = useState(null);
  const [opsProcesso, setOpsProcesso] = useState(false)
  const [updateInfo, setUpdateInfo] = useState(true)
  const [dateSelected, setDateSelected] = useState(null)
  const [rotinaOpProc, setRotinaOpProc] = useState(null)
  const [layouts, setLayouts] = useState(null)
  const [progRealzd, setProgRealzd] = useState(null)

  let layoutRef = useRef(null)

  useEffect(() => {
    Api.get('rotinas-de-producao').then(res => {
      setProcessos(res.data.rotinaNome);
      setRotinas(res.data.codigoRotina)
    })

    Api.get('/configuracoes/layouts-visualizacao').then(res => {
      if(Object.keys(res.data).length > 0){
      setLayouts(res.data)
    }
    })
  }, [processos])

  useEffect(() => {
    setDateSelected(document.getElementById('date-select').value)
    if(updateInfo & dateSelected != null){
      setUpdateInfo(false)
      AtualizaOpsProcesso()
      .then(res => {
        setOpsProcesso(res);
        setUpdateInfo(true)
      })}
  })

  const AtualizaOpsProcesso = () => {
    return new Promise(async (resolve) => {
      let checkFam700 = document.getElementById('checkboxFamilia700').checked
      await Api.get(`/v1/painel/mapa-processos/${dateSelected}/${checkFam700}`)
      .then(res => { resolve(res.data)})
      await Api.get(`/programado-realizado/${dateSelected}/${checkFam700}`)
      .then((res) => {
        setProgRealzd(res.data)
      })
    })
  }

  const scrollHorizontal = (parentEl, i) =>{
    return new Promise((resolve, reject) => {
      let windowWidth = window.innerWidth
      let childEl = parentEl.getElementsByClassName('card--listarea')[0]
      console.log(childEl)
      let scrollX = (i * -280)

      if (((windowWidth + scrollX) > 0) && ((scrollX - 280) < -windowWidth)){
        childEl.style.marginLeft = `-${(windowWidth + scrollX) + 60}px`
      }else if ((windowWidth + scrollX) < 0){
        childEl.style.marginLeft = `${scrollX + (windowWidth - 320)}px`
      }else if(((scrollX - 280) > -windowWidth)){
        childEl.style.marginLeft = `${0}px`
      }
    })
  }

  const scrollToOpSearched = (e) =>{
    let opProcurada = document.getElementById("searchedOp")
    let cardOp = document.getElementById(opProcurada.value)
    if (cardOp != null){
      let rotinaProcurar = parseInt(cardOp.parentNode.parentNode.id)
      setRotinaOpProc(rotinaProcurar)
      let parentEl = document.getElementById(rotinaProcurar)
      
      opsProcesso[rotinaProcurar].map(async (info, i) => {
        if (info[0] === parseInt(opProcurada.value)){
          await scrollHorizontal(parentEl, i)
        }
      })

      $('html').animate({
          scrollTop: $(`#${opProcurada.value}`).offset().top
      }, 1500);

      cardOp.animate(foundedOpAnimation, {duration: 1500, iterations: 5})
    }else{
      alert('Ordem de produção não encontrada !')
    }
    opProcurada.value = ''
  }

  const changeShowedLayout = (e) => {
    e.preventDefault()
    setUpdateInfo(true)
    layoutRef.current = e.currentTarget.value
  }

  const foundedOpAnimation = [
  {background: 'radial-gradient(#FF9F1C, #ffbd61ce)'},
  ];

  return (
    <div className='app'>
      <section className="lists">
        <div className="filter--options">
          <div className="data--target">
            <h3>Data Programada:</h3>
            <input type="date" defaultValue={dateTarget()} onChange={(e)=>setDateSelected(e.currentTarget.value)} id='date-select'/>
          </div>
          <div className="layout--exibicao">
            <h3>Layout:</h3>
            <select id="layoutExibido" onChange={(e)=>changeShowedLayout(e)}>
              <option value={null}>TODAS ROTINAS</option> 
              {
                layouts != null && Object.keys(layouts).map((layout)=>(
                 <option value={layout}>{layout}</option> 
                ))
              }
            </select>
            <div className="familia--exibida">
              <h3>Somente Acabado</h3>
              <input type="checkbox" id='checkboxFamilia700' defaultChecked={true}/>
            </div>
          </div>
          <div className="filter--op" >
            <input type="text" placeholder='Digite o número da OP ...' id='searchedOp'/>
            <div className="search--icon" onClick={(e)=>scrollToOpSearched(e)}>
              < SearchIcon style={{
                'fill': '#c7c7c7',
              }} />
            </div>
          </div>
        </div>
        {
          layouts != null && layoutRef.current != null  && layoutRef.current != 'TODAS ROTINAS' && progRealzd != null?
          layouts[layoutRef.current].map((etapa) => (
            <Card_row nomeProcesso={etapa[1]} 
            opsProcesso={opsProcesso[etapa[0]]} 
            codRotina={etapa[0]} 
            changeMarginSearchOp={[rotinaOpProc, setRotinaOpProc]} 
            programadoRealizado={progRealzd[etapa[0]]} 
            specialLayout={true}
            />
            ))
          : progRealzd != null &&
          processos != null && processos.map((processo, i) => {
          return(
            <Card_row 
              nomeProcesso={processo} 
              opsProcesso={opsProcesso[rotinas[i]]} 
              codRotina={rotinas[i]} 
              changeMarginSearchOp={[rotinaOpProc, setRotinaOpProc]} 
              programadoRealizado={progRealzd[rotinas[i]]}
            />
          )})
        }

      </section>
    </div>

  );
}
