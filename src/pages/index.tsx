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
  const [response, setResponse] = useState<ITransferencia[]>()
  const responseTotal = useRef<ITransferencia[]>([] as ITransferencia[])
  const [idDaConta, setIdDaConta] = useState('2')
  const [URL, setURL] = useState(`${baseURL}${idDaConta}`)
  const [dataInicio, setDataInicio] = useState('')
  const [dataFim, setDataFim] = useState('')
  const [operador, setOperador] = useState('')
  // const [page, setPage] = useState(0)
  // const [rowsPerPage, setRowsPerPage] = useState(5)

  const getAllElementsInConta = async () => {
    axios.get<ITransferencia[]>(`${baseURL}${idDaConta}`).then((res: any) => {
      responseTotal.current = res.data
    })
  }
  const getElementsWithFiltersInConta = async () => {
    axios.get<ITransferencia[]>(`${URL}`).then((res) => {
      setResponse(res.data)
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
    
       <Stack direction="row" justifyContent="space-evenly" mt={2}>
        <FormControl >
          <InputLabel htmlFor="outlined-adornment-amount">Valor Total</InputLabel>
          <OutlinedInput
            id="outlined-adornment-amount"
            startAdornment={<InputAdornment position="start">R$</InputAdornment>}
            label="Amount"
            value={getTotalValueOfResponse(responseTotal.current || [] as ITransferencia[]).toFixed(2)}
            inputProps={{
            readOnly: true,
          }}
          />
        </FormControl>
          <FormControl >
          <InputLabel htmlFor="outlined-adornment-amount">Valor no Período</InputLabel>
          <OutlinedInput
            id="outlined-adornment-amount"
            startAdornment={<InputAdornment position="start">R$</InputAdornment>}
            label="Amount"
            value={getTotalValueOfResponse(response || [] as ITransferencia[]).toFixed(2)}
            inputProps={{
            readOnly: true,
          }}
          />
        </FormControl>
       </Stack>
       <BasicTable response={response || [] as ITransferencia[]}/>
     
    </Stack>
  )
}
