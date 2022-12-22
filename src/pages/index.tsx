import { useCallback, useEffect, useRef, useState } from 'react'
import { styled } from '@mui/material/styles'
import TableCell, { tableCellClasses } from '@mui/material/TableCell'
import TableRow from '@mui/material/TableRow'
import axios from 'axios'
import { ITransferencia } from '../Model/ResponseModel'
import SearchIcon from '@mui/icons-material/Search'
import {
  Button,
  FormControl,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  Stack,
  TextField
} from '@mui/material'
import BasicTable from '../components/Table/Table'
import FilterForm from '../components/FilterForm/FilterForm'


const baseURL = 'http://localhost:8080/transferencias/'

export default function Index() {
  const [response, setResponse] = useState<ITransferencia[]>([] as ITransferencia[])
  const responseTotal = useRef<ITransferencia[]>([] as ITransferencia[])
  const [idDaConta, setIdDaConta] = useState('2')
  const [URL, setURL] = useState(`${baseURL}${idDaConta}`)
  const [dataInicio, setDataInicio] = useState('')
  const [dataFim, setDataFim] = useState('')
  const [operador, setOperador] = useState('')

  const getAllElementsInConta = async () => {
    axios.get<ITransferencia[]>(`${baseURL}${idDaConta}`).then((res: any) => {
      responseTotal.current = res.data.content
    })
  }
  const getElementsWithFiltersInConta = async () => {
    axios.get(`${URL}`).then((res) => {
      setResponse(res.data.content)
    })
  }

  useEffect(() => {
    getAllElementsInConta()
    getElementsWithFiltersInConta()
  }, [URL])

  const getTotalValueOfResponse = (responseTotal: ITransferencia[]) => {
      return responseTotal?.map(res => res.valor).reduce((prev, next) => prev + next, 0)
    }

  const handleFilterUrl = (
    dataInicio: string,
    dataFim: string,
    operador: string
  ) => {
    setURL(
      `${baseURL}${idDaConta}?${dataInicio ? `dataInicio=${dataInicio}&` : ''}${
        dataFim ? `dataFim=${dataFim}&` : ''
      }${operador ? `operador=${operador}` : ''}`
    )
  }

  return (
    
    <Stack maxWidth="75vw" margin="0 auto">
      <FilterForm
        idDaConta={idDaConta}
        setIdDaConta={setIdDaConta}
        dataInicio={dataInicio}
        setDataInicio={setDataInicio}
        dataFim={dataFim}
        setDataFim={setDataFim}
        operador={operador}
        setOperador={setOperador}
        handleFilterUrl={handleFilterUrl}
      />    
       <Stack direction="row" justifyContent="space-evenly" mt={2} mb={1} sx={{
        backgroundColor: '#424242',
        borderRadius: '5px'
       }}>
        <h4 style={{color: "#eee"}}>{`VALOR TOTAL : R$ ${getTotalValueOfResponse(responseTotal.current || [] as ITransferencia[]).toFixed(2)}`}</h4>
        <h4 style={{color: "#eee"}}>{`VALOR NO PERÍODO : R$ ${getTotalValueOfResponse(response || [] as ITransferencia[]).toFixed(2)}`}</h4>        
       </Stack>
       <BasicTable response={response || [] as ITransferencia[]}/>     
    </Stack>
  )
}
