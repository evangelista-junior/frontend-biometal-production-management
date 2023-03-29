import React, { useEffect, useRef, useState } from 'react';
import './index.css'
import Api from '../../Api'
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import CloseIcon from '@mui/icons-material/Close';
import PlaylistAddOutlinedIcon from '@mui/icons-material/PlaylistAddOutlined';
import PlaylistRemoveOutlinedIcon from '@mui/icons-material/PlaylistRemoveOutlined';

function TableEsterilizacoes() {
  const [listasEsterilizacoes, setListasEsterilizacoes] = useState({result: []})
  const [opsList, setOpsList] = useState([])
  const [listOpSelected, setListOpSelected] = useState(null)
  const [opsAlocadas, setOpsAlocadas] = useState([])
  const [opsDisponiveis, setOpsDisponiveis] = useState({NUMEROOP:[]})
  const [validateRequest, setValidateRequest] = useState(false)

  var listRef = useRef(null)
  var dateRef = useRef('')


  useEffect(()=>{
    Api.get('/esterilizacoes/listas').then((res)=>{
      setListasEsterilizacoes(res.data)
    })
  })

  useEffect(()=>{
    if (validateRequest){
      Api.get(`/esterilizacoes/ops-lista/${listRef.current}`)
      .then(response =>{
        setOpsAlocadas(response.data.opsList)
      })

      Api.get('/esterilizacoes/ops-disponiveis')
      .then(response =>{
        setOpsDisponiveis(response.data)
      })

      setValidateRequest(false)
    }
  })

  function formatDate (date) {
    return new Date(date).toLocaleDateString('pt-BR', {timeZone: "UTC"})
  }

  function openDeleteModal(e){
    e.preventDefault()
    let modal = document.getElementsByClassName('modal--excluirLista')[0]
    let selectedList = e.currentTarget.parentNode.parentNode.parentNode.id
    listRef.current = selectedList
    
    modal.style.display = 'block'
  } 

  function deleteList (e) {
    e.preventDefault()
    let modal = document.getElementsByClassName('modal--excluirLista')[0]
    let response = document.activeElement.value

    if (response === 'Sim'){
      Api.post('/esterilizacoes/deletar-lista', {opDelete:listRef.current})
    }

    listRef.current = null
    modal.style.display = 'none'
  }

  function openVisualizateModal(e){
    e.preventDefault()
    let modal = document.getElementsByClassName('modal--moreInfo')[0]
    let selectedList = parseInt(e.currentTarget.parentNode.parentNode.parentNode.id)
    Api.get(`/esterilizacoes/ops-lista/${selectedList}`).then((res) =>{
      setListOpSelected(res.data.selectedList)
      setOpsList(res.data.opsList)
    })
    
    modal.style.display = 'block'
  }

  function closeVisualizateModal (e) {
    e.preventDefault()
    let modal = document.getElementsByClassName('modal--moreInfo')[0]
    listRef.current = null

    modal.style.display = 'none'
  }

  async function openEditModal(e){
    e.preventDefault()
    listRef.current = parseInt(e.currentTarget.parentNode.parentNode.parentNode.id)
    setValidateRequest(true)
    dateRef.current = opsAlocadas[0].DATATARGET.substring(0,10)
    let modal = document.getElementsByClassName('modal--editList')[0]
    modal.style.display = 'block'
  } 

  function closeEditModal (e) {
    e.preventDefault()
    let modal = document.getElementsByClassName('modal--editList')[0]
    listRef.current = null
    
    modal.style.display = 'none'
  }

  function removeOpListaEdicao(e) {
    e.preventDefault()
    let opDelete = parseInt(e.currentTarget.parentNode.id)

    Api.post('/esterilizacoes/excluir-op-edicao-lista', {opDelete})
    
    setValidateRequest(true)
  }

  function addOpListaEdicao(e) {
    e.preventDefault()
    let opAdd = parseInt(document.getElementById('ops--disp-editar').value)
    let idxOp = opsDisponiveis.NUMEROOP.indexOf(opAdd)

    Api.post('/esterilizacoes/adicionar-op', {
      NUMEROOP: opAdd,
      CODIGO: opsDisponiveis.CODIGO[idxOp],
      DESCRICAO: opsDisponiveis.DESCRICAO[idxOp],
      QTDEPROGRAMADA: opsDisponiveis.QTDEPROGRAMADA[idxOp],
      DATAEMISSAOOP: opsDisponiveis.DATAEMISSAOOP[idxOp],
      IDPLANEJAMENTO: listRef.current,
      DATATARGET: new Date()
    })

    // Api.post('/esterilizacoes/excluir-op-edicao-lista', {opDelete})
    
    setValidateRequest(true)
  }

  function changeDateListaEdicao(e){
    e.preventDefault()
    dateRef.current = e.target.value
    Api.post('/esterilizacoes/alterar-data-edicao-lista', {
      list: listRef.current,
      newDate: dateRef.current 
    })
    
    setValidateRequest(true)
  }

  return (
    <div className="card--esterilizacao--list">
      
      <div className="modal--excluirLista" >
        <form className="formExcluirLista" onSubmit={(e)=>deleteList(e)}>
          <h2>Tem certeza que deseja excluir a lista ?</h2>
          <input type="submit"  value='Sim'/>
          <input type="submit"  value='Não'/>
        </form>
      </div>

      <div className="modal--moreInfo">
        <div className="list--moreInfo">
            <CloseIcon className='closeModalMoreInfo'
              style={{ 'fill': 'white', 'fontSize': '20px' }}
              onClick={(e) => closeVisualizateModal(e)} />
          <table>
            <tr>
              <th>Nº OP</th>
              <th>Código</th>
              <th>Descrição</th>
              <th>Quantidade</th>
            </tr>
            {
              listOpSelected != null && 
              opsList.map((opInfo) =>(
                <tr>
                  <td>{opInfo.NUMEROOP}</td>
                  <td>{opInfo.CODIGO}</td>
                  <td>{opInfo.DESCRICAO.substring(0,30) + ' ...'}</td>
                  <td>{opInfo.QTDEPROGRAMADA}</td>
                </tr>
              ))
            }
          </table>
        </div>
      </div>

      <div className="modal--editList" >
        <div className='EditarLista' >
          <div className="container--editarLista">
            <CloseIcon className='closeModalEditarLista'
              style={{ 'fill': 'white', 'fontSize': '20px' }}
              onClick={(e) => closeEditModal(e)} />
            <h1>Editar Lista de Esterilização</h1>

            <div className="date--select">
              <h4>Data de esterilização:</h4>
              <input type="date" id='dateList' onChange={(e) =>changeDateListaEdicao(e)} 
              value={dateRef.current}/>
            </div>

            <div className="ops--select">
              <h4>Ordem de Produção:</h4>
              <select id="ops--disp-editar">
                {
                  opsDisponiveis.NUMEROOP.length > 0 && opsDisponiveis.NUMEROOP.map((op, i) => (
                    <option value={op}>{op} - {opsDisponiveis.CODIGO[i]}</option>
                  ))
                }
              </select>
              <PlaylistAddOutlinedIcon className='addOp' style={{ 'fontSize': '30px' }} 
              onClick={(e) => addOpListaEdicao(e)} />
            </div>
          </div>

          <div className="list--ops">
            {opsAlocadas.length > 0 && opsAlocadas.map((opInfo, i) => (
              <div className="op--single" id={opInfo.NUMEROOP}>
                <p>
                  <span>{opInfo.NUMEROOP}</span> - {opInfo.CODIGO} - {opInfo.DESCRICAO.substring(0, 33) + '...'}
                </p>
                <PlaylistRemoveOutlinedIcon className='removeOp' onClick={(e) => removeOpListaEdicao(e)} />
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="center" style={{ 'flexWrap': 'wrap' }}>
        {listasEsterilizacoes.result.length > 0 && listasEsterilizacoes.result.map(lista => (
          <div className="card--esterilizacao--single" id={lista._id} date={lista.data_target}>
            <div className="single--actions">
              <p>< InfoOutlinedIcon className='more--info' onClick={(e)=>openVisualizateModal(e)} /></p>
              <p> < EditOutlinedIcon className='edit--info'onClick={(e)=>openEditModal(e)} /></p>
              <p>< DeleteOutlinedIcon className='delete--card' onClick={(e)=>openDeleteModal(e)}/></p>
            </div>

            <div className="single--id">
              <h4>ID</h4>
              <p>{String('0000000' + lista._id).slice(-4)}</p>
            </div>

            <div className="single--date">
              <h4>Data Programada</h4>
              <p>{formatDate(lista.data_target)}</p>
            </div>

            <div className="single--total--pcs">
              <h4>Total Pçs.</h4>
              <p>{lista.total_pecas}</p>
            </div>

            <div className="single--qtde--ops">
              <h4>Qtde. OP's</h4>
              <p>{lista.quantidade_ops}</p>
            </div>

            <div className="single--finished">
              <h4>Qtde Concluído</h4>
              <p>{lista.qtde_concluido}</p>
            </div>
          </div>
        ))}
      </div>
    </div >
  )
}

export default TableEsterilizacoes;