import React, {useEffect, useRef, useState} from 'react';
import './index.css';
import CloseIcon from '@mui/icons-material/Close';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import Api from '../../Api';

const LayoutConfig: React.FC = () => {
  const [layoutsCadastrados, setLayoutsCadastrados] = useState(null)
  const [infoRotinas, setInfoRotinas] = useState(null)
  const [rotinasAlocadasLayout, setRotinasAlocadasLayout] = useState({
    codigoRotina: [],
    rotinaNome: []
  })
  let layoutRef = useRef(null)

  useEffect(()=>{
    Api.get('/rotinas-de-producao').then(response => {
      setInfoRotinas(response.data)
    })

    Api.get('/configuracoes/layouts-visualizacao').then(response => {
      setLayoutsCadastrados(response.data)
    })

  }, [])

  const abrirModalCriarNovoLayout = (e) =>{
    e.preventDefault()
    document.getElementsByClassName('modalCriarNovoLayout')[0].style.display = 'block'
  }

  const fecharModalCriarNovoLayout = (e) => {
    e.preventDefault()
    document.getElementsByClassName('modalCriarNovoLayout')[0].style.display = 'none'
  }

  const adicionarRotina = (e) => {
    e.preventDefault()
    if (infoRotinas.codigoRotina.length > 0){
    let codRotinaSelected = parseInt(document.getElementById('selectRotinaNovoLayout').value)
    let idxSelectedInfoRotinas = infoRotinas.codigoRotina.indexOf(codRotinaSelected)

    setRotinasAlocadasLayout({
      codigoRotina: [...rotinasAlocadasLayout.codigoRotina, ...[codRotinaSelected]],
      rotinaNome: [...rotinasAlocadasLayout.rotinaNome, ...[infoRotinas.rotinaNome[idxSelectedInfoRotinas]]]
    })

    infoRotinas.codigoRotina.map((codRotinaExcluir, i) => {
      if (i === idxSelectedInfoRotinas){
        infoRotinas.codigoRotina.splice(i, 1),
        infoRotinas.rotinaNome.splice(i, 1)
      }
    })}
  }

  const removerRotina = (e) => {
    e.preventDefault()
    let codRotinaRem = parseInt(e.currentTarget.parentNode.id)
    let idxAddInfoRotinas = rotinasAlocadasLayout.codigoRotina.indexOf(codRotinaRem)

    setInfoRotinas({
      codigoRotina: [...infoRotinas.codigoRotina, ...[codRotinaRem]],
      rotinaNome: [...infoRotinas.rotinaNome, ...[rotinasAlocadasLayout.rotinaNome[idxAddInfoRotinas]]]
    })

    rotinasAlocadasLayout.codigoRotina.map((codRotinaExcluir, i) => {
      if (i === idxAddInfoRotinas){
        rotinasAlocadasLayout.codigoRotina.splice(i, 1),
        rotinasAlocadasLayout.rotinaNome.splice(i, 1)
      }
    })
    setRotinasAlocadasLayout({
      codigoRotina: rotinasAlocadasLayout.codigoRotina,
      rotinaNome: rotinasAlocadasLayout.rotinaNome
    })
  }

  const cadastrarNovoLayout = (e) => {
    e.preventDefault();
    let nomeLayout = document.getElementById('nome--novoLayout').value.toUpperCase()

    if (nomeLayout != '' & rotinasAlocadasLayout.codigoRotina.length > 0){
      Api.post('/configuracoes/cadastrar-layout-visualizacao', {
        NOMELAYOUT: nomeLayout,
        CODROTINAS: rotinasAlocadasLayout.codigoRotina,
        DESCRICAOROTINAS: rotinasAlocadasLayout.rotinaNome
      }).then(result => {
        alert(result.data)
        if (result.data === 'Layout criado com sucesso !'){
          window.location.reload(false)
        }
      })
    }else{
      alert('Por favor digite um nome para o layout e inclua as rotinas na ordem desejada !')
    }
  }

  const displayRotinasAlocadas = (e) => {
    e.preventDefault()
    let layout = e.currentTarget.parentNode.id

    let doc = document.querySelector(`#${layout} .rotinas--alocadas`)
    let newState = 'block'
    let newText = 'mostrar menos ▲'
    if (doc.style.display === 'block') {newState = 'none'; newText = 'mostrair mais ▼'}
    doc.style.display = newState
    document.querySelector(`#${layout} > p`).innerHTML = newText
  }

  const openModalDeletLayout = (e) => {
    let modal = document.getElementsByClassName('modal--excluirLista')[0]
    let layout = e.currentTarget.parentNode.id
    layoutRef.current = layout
    modal.style.display = 'block'
  }

  const excluirLayout = (e) =>{
    e.preventDefault()
    let modal = document.getElementsByClassName('modal--excluirLista')[0]
    let response = document.activeElement.value

    if (response === 'Sim'){
      Api.post('/configuracoes/excluir-layout', {NOMELAYOUT:layoutRef.current})
      window.location.reload(false)
    }

    
    modal.style.display = 'none'
  }

  return (
    <div className="campo--config">

      <div className="modal--excluirLista" >
        <form className="formExcluirLista" onSubmit={(e)=>excluirLayout(e)}>
          <h2>Tem certeza que deseja excluir o layout ?</h2>
          <input type="submit"  value='Sim'/>
          <input type="submit"  value='Não'/>
        </form>
      </div>

      <div className="modalCriarNovoLayout">
        <div className='formCriarNovoLayout'>
          <CloseIcon className='closeModal'
            style={{ 'fill': 'white', 'fontSize': '20px' }}
            onClick={(e) => fecharModalCriarNovoLayout(e)} />

            <h2>CRIAR LAYOUT</h2>
            <div className="layoutParams">
              <input type="text" id='nome--novoLayout' placeholder='Nome do layout' />
              <select id="selectRotinaNovoLayout">
                {
                  infoRotinas != null && infoRotinas.codigoRotina.map((codigoRotina, i) => (
                    <option value={codigoRotina}>{infoRotinas.rotinaNome[i]}</option>
                  ))
                }
              </select>
              <p onClick={(e)=>adicionarRotina(e)}>+</p>
            </div>
            <div className="layoutRotinasAdicionadas">
              {
                rotinasAlocadasLayout.codigoRotina.map((codRotinaAdd, i) => (
                <div className="rotinaAdicionadaSingle" id={codRotinaAdd}>
                  <p className='codRotinaNovoLayout'>{codRotinaAdd}</p>
                  <p className='descRotinaNovoLayout'>{rotinasAlocadasLayout.rotinaNome[i]}</p>
                  <p className='removeButtonNovoLayout' onClick={(e)=>removerRotina(e)}>-</p>
                </div>
                ))
              }
            </div>
            <p className='cadastrar--novoLayout' onClick={(e)=>cadastrarNovoLayout(e)}>Cadastrar Lista</p>
        </div>
      </div>

      <h1>LAYOUT DE VISUALIZAÇÃO DE PROCESSOS</h1>
      <div className="layout--configs">
        <p onClick={(e)=>abrirModalCriarNovoLayout(e)}>Criar Novo Layout</p>
        <div className="layouts">
          {
            layoutsCadastrados != null && Object.keys(layoutsCadastrados).map((layout)=>{
              return(
                <div className="layout--single"  id={layout.replace(' ', '_-_')}>
                  <h3>{layout}</h3>
                  < DeleteOutlinedIcon className='delete--card' style={{
                    'fill': '#264653', 'marginLeft': '5px'
                    }} onClick={(e)=>openModalDeletLayout(e)}/>
                  <div className="rotinas--alocadas" style={{'display': 'none'}}>
                    {
                      layoutsCadastrados[layout].map((rotinaAlocada)=>(
                        <p>{rotinaAlocada[1]}</p>
                      ))
                    }
                  </div>
                  <p onClick={(e)=>displayRotinasAlocadas(e)}>mostrair mais ▼</p>
                </div>
              )
            })
          }
        </div>
      </div>
    </div>
  );
}

export default LayoutConfig;