import React, { useState, useEffect, useRef } from 'react';
import Api from '../Api';
import TableEsterilizacoes from '../components/table_esterilizacoes/index';
import AddIcon from '@mui/icons-material/Add';
import CloseIcon from '@mui/icons-material/Close';
import PlaylistAddOutlinedIcon from '@mui/icons-material/PlaylistAddOutlined';
import PlaylistRemoveOutlinedIcon from '@mui/icons-material/PlaylistRemoveOutlined';

export default function Esterilizacoes() {
  const [opsDisponiveis, setOpsDisponiveis] = useState({
    NUMEROOP: [],
    CODIGO: [],
    DESCRICAO: [],
    QTDEPROGRAMADA: [],
    DATAEMISSAOOP: []
  });
  const [opsAlocadas, setOpsAlocadas] = useState({
  NUMEROOP: [],
  CODIGO: [],
  DESCRICAO: [],
  QTDEPROGRAMADA: [],
  DATAEMISSAOOP: []
});
  const [validaRequisicao, setValidaRequisicao] = useState(true)
  var dateRef = useRef(null)

  useEffect(() => {
    
    if (validaRequisicao){

    Api.get('/esterilizacoes/ops-disponiveis').then(response => {
      setOpsDisponiveis(response.data)
    })

    Api.get('/esterilizacoes/ops-alocadas').then(response => {
      setOpsAlocadas(response.data)
    })

    setValidaRequisicao(false)
  }})

  const abrirModalNovaLista = (e) => {
    e.preventDefault()
    let modal = document.querySelector('.modalCriarLista')
    modal.style.display = 'block'

  }

  const fecharModalNovaLista = (e) => {
    e.preventDefault()
    let modal = document.querySelector('.modalCriarLista')
    modal.style.display = 'none'
  }

  const addOpLista = (e) => {
    let select = parseInt(document.getElementById('ops--disp').value)
    let indexOpToAdd = opsDisponiveis.NUMEROOP.indexOf(select)

    opsDisponiveis.NUMEROOP.map((op, index) => {
      if (index === indexOpToAdd) {
        let codigo = opsDisponiveis.CODIGO[index];
        let descricao = opsDisponiveis.DESCRICAO[index];
        let quantidades = opsDisponiveis.QTDEPROGRAMADA[index];
        let dataEmissao = opsDisponiveis.DATAEMISSAOOP[index];

        opsAlocadas.NUMEROOP.push(op);
        opsAlocadas.CODIGO.push(codigo);
        opsAlocadas.DESCRICAO.push(descricao);
        opsAlocadas.QTDEPROGRAMADA.push(quantidades);
        opsAlocadas.DATAEMISSAOOP.push(dataEmissao);

        Api.post('/esterilizacoes/ops-alocadas', opsAlocadas)

        setValidaRequisicao(true)
      }

    })
  }

  const removeOpLista = (e) => {
    let opRemove = parseInt(e.currentTarget.parentNode.id)
    let indexOpToRemove = opsAlocadas.NUMEROOP.indexOf(opRemove)

    opsAlocadas.NUMEROOP.map((op, index) => {
      if (index === indexOpToRemove) {

        opsAlocadas.NUMEROOP.splice(index, 1)
        opsAlocadas.CODIGO.splice(index, 1)
        opsAlocadas.DESCRICAO.splice(index, 1)
        opsAlocadas.QTDEPROGRAMADA.splice(index, 1)
        opsAlocadas.DATAEMISSAOOP.splice(index, 1)

        Api.post('/esterilizacoes/ops-alocadas', opsAlocadas)

        setValidaRequisicao(true)
      }
    })
  }

  const criarListaEsterilizacao = (e) => {
    e.preventDefault()
    let modal = document.querySelector('.modalCriarLista')
    
    if (dateRef.current !== null && opsAlocadas.CODIGO.length !== 0){
    Api.get('/painel/listas-esterilizacoes').then((response) => {
      let newIdPlanejamento = response.data[0].IDPLANEJAMENTO + 1
      let date = new Date()

      Api.post('/esterilizacoes/criar-lista', {
        IDPLANEJAMENTO: newIdPlanejamento,
        DATATARGET: dateRef.current,
        AUTOR: 'EVANGELISTA.TEIXEIRA', // TODO: AJUSTAR PARA USUARIO LOGADO
        DATACRIACAO: date
      })

      opsAlocadas.NUMEROOP.map((op, index) => {
        Api.post('/esterilizacoes/adicionar-op', {
          NUMEROOP: op,
          CODIGO: opsAlocadas.CODIGO[index],
          DESCRICAO: opsAlocadas.DESCRICAO[index],
          QTDEPROGRAMADA: opsAlocadas.QTDEPROGRAMADA[index],
          DATAEMISSAOOP: opsAlocadas.DATAEMISSAOOP[index],
          IDPLANEJAMENTO: newIdPlanejamento,
          DATATARGET: dateRef.current
        })
      })
    })
    Api.post('/esterilizacoes/ops-alocadas', {
      NUMEROOP: [],
      CODIGO: [],
      DESCRICAO: [],
      QTDEPROGRAMADA: [],
      DATAEMISSAOOP: []
    })
    setOpsAlocadas({
      NUMEROOP: [],
      CODIGO: [],
      DESCRICAO: [],
      QTDEPROGRAMADA: [],
      DATAEMISSAOOP: []
    })
    modal.style.display = 'none'}
    else{
      alert('Por favor selecione uma data target e insira ao menos uma OP na lista!')
    }
  }


  return (
    <div className='app'>

      <div className="modalCriarLista" >
        <form className='formCriarLista' onSubmit={(e)=>criarListaEsterilizacao(e)}>
          <div className="container--criarLista">
            <CloseIcon className='closeModalCriarLista'
              style={{ 'fill': 'white', 'fontSize': '20px' }}
              onClick={(e) => fecharModalNovaLista(e)} />
            <h1>Criar Lista de Esterilização</h1>

            <div className="date--select">
              <h4>Data de esterilização:</h4>
              <input type="date" id='dateList' onChange={(e) => dateRef.current = e.target.value}/>
            </div>

            <div className="ops--select">
              <h4>Ordem de Produção:</h4>
              <select id="ops--disp">
                {
                  opsDisponiveis.NUMEROOP.length > 0 && opsDisponiveis.NUMEROOP.map((op, i) => (
                    <option value={op}>{op} - {opsDisponiveis.CODIGO[i]}</option>
                  ))
                }
              </select>
              <PlaylistAddOutlinedIcon className='addOp' style={{ 'fontSize': '30px' }} onClick={(e) => addOpLista(e)} />
            </div>
          </div>

          <div className="list--ops">
            {opsAlocadas.NUMEROOP.length > 0 && opsAlocadas.NUMEROOP.map((op, i) => (
              <div className="op--single" id={op}>
                <p>
                  <span>{op}</span> - {opsAlocadas.CODIGO[i]} - {opsAlocadas.DESCRICAO[i].substring(0, 33) + '...'}
                </p>
                <PlaylistRemoveOutlinedIcon className='removeOp' onClick={(e) => removeOpLista(e)} />
              </div>
            ))}
          </div>
              
          <input type="submit" value='Cadastrar Lista' />
        </form>
      </div>
      <Header />

      <section className="esterilizacoes--panel">

        <div className="panel--title">
          <h1>Painel de Esterilizações</h1>
        </div>

        <div className="center">
          <div className="panel--buttons" >
            <div className="filter--op--painel">
              <input type="text" placeholder='Digite o número da OP' />
            </div>
            <p onClick={(e) => abrirModalNovaLista(e)}><AddIcon style={{ 'fill': 'white', 'fontSize': '17px' }} /> Nova lista</p>
          </div>
        </div>

        <div className="center">
          <div className="panel--content">
            <TableEsterilizacoes />
          </div>
        </div>
      </section>
    </div >

  );
}
