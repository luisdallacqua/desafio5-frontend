import { useCallback, useEffect, useRef, useState } from 'react'
import { styled } from '@mui/material/styles'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell, { tableCellClasses } from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'
import TablePagination from '@mui/material/TablePagination'
import axios from 'axios'
import { ITransferencia } from '../Model/ResponseModel'
import SearchIcon from '@mui/icons-material/Search'
import { Button, FormControl, InputAdornment, InputLabel, OutlinedInput, Stack, TextField } from '@mui/material'
import { dateFormatter } from '../util/dateFormater'

const StyledTableHeaderCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.grey[800],
    color: theme.palette.common.white,
    textTransform: 'uppercase'
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14
  }
}))

const StyledTableRowCell = styled(TableRow)(({ theme }) => ({
  ['&:last-child td, &:last-child th']: {
    border: 0
  },
  ['&:nth-child(even)']: {
    backgroundColor: theme.palette.grey[200]
  }
}))

const baseURL = 'http://localhost:8080/transferencias/'

export default function BasicTable() {
  const [response, setResponse] = useState<ITransferencia[]>()
  const [responseTotal, setResponseTotal] = useState<ITransferencia[]>()
  const [idDaConta, setIdDaConta] = useState('2')
  const [URL, setURL] = useState(`${baseURL}${idDaConta}`)
  const [dataInicio, setDataInicio] = useState('')
  const [dataFim, setDataFim] = useState('')
  const [operador, setOperador] = useState('')
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(5)

  const getAllElementsInConta = async () => {
    axios.get(`${baseURL}${idDaConta}`).then((res: any) => {
      console.log("NÃO FILTRTADO",res)
      setResponseTotal(res.data)
    })
  }
  const getElementsWithFiltersInConta = async () => {
    axios.get(`${URL}`).then((res: any) => {
      console.log("FILTRTADO",res)
      setResponse(res.data)
    })
  }

  useEffect(() => {
    getAllElementsInConta()     
    getElementsWithFiltersInConta()
  }, [URL])


  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage)
  }

  const getAllValuesInIdConta = (responseTotal: ITransferencia[]) => {
      console.log("RESPONSE TOTAL AQUI", responseTotal)
      return responseTotal?.map(res => res.valor).reduce((prev, next) => prev + next, 0)
    }
  
  
  const getAllValuesInFilteredIdConta = (response: ITransferencia[]) => {
    return response?.map(res => res.valor).reduce((prev, next) => prev + next, 0)
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

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(+event.target.value)
    setPage(0)
  }

  return (
    <Stack maxWidth="75vw" margin="0 auto">
      <Stack direction="row" justifyContent="space-between" mt={2}>
        <TextField
          id="operacao"
          label="Id da operação"
          placeholder="Por padrão é 2"
          type="text"
          value={idDaConta}
          onChange={(e) => setIdDaConta(e.target.value)}
          sx={{ width: 220 }}
        />

        <TextField
          id="date"
          label="Data Inicio"
          type="date"
          defaultValue="2017-05-24"
          value={dataInicio}
          onChange={(e) => setDataInicio(e.target.value)}
          sx={{ width: 220 }}
          InputLabelProps={{
            shrink: true
          }}
        />
        <TextField
          id="date"
          label="Data Fim"
          type="date"
          defaultValue="2017-05-24"
          value={dataFim}
          onChange={(e) => setDataFim(e.target.value)}
          sx={{ width: 220 }}
          InputLabelProps={{
            shrink: true
          }}
        />

        <TextField
          id="nomeOperador"
          label="Nome do Operador"
          type="text"
          value={operador}
          onChange={(e) => setOperador(e.target.value)}
          sx={{ width: 220 }}
        />
      </Stack>

      <Stack direction="row" justifyContent="flex-end" mt={2} mb={2}>
        <Button
          variant="contained"
          endIcon={<SearchIcon />}
          onClick={() => handleFilterUrl(dataInicio, dataFim, operador)}
        >
          Pesquisar
        </Button>
      </Stack>
        
       <Stack direction="row" justifyContent="space-evenly" mt={2}>

        <FormControl >
          <InputLabel htmlFor="outlined-adornment-amount">Valor Total</InputLabel>
          <OutlinedInput
            id="outlined-adornment-amount"
            startAdornment={<InputAdornment position="start">R$</InputAdornment>}
            label="Amount"
            value={getAllValuesInIdConta(responseTotal || [] as ITransferencia[])}
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
            value={getAllValuesInFilteredIdConta(response || [] as ITransferencia[])}
            inputProps={{
            readOnly: true,
          }}
          />
        </FormControl>
{/* 
        <TextField
          id="valorTtotal"
          label="Valor Total"
          type="text"
          value={getAllValuesInIdConta(responseTotal || [] as ITransferencia[])}          
          sx={{ width: 220 }}
          InputLabelProps={{
            shrink: true
          }}
        />
        <TextField
          id="valorTtotal"
          label="Valor no periodo"
          type="text"
          value={getAllValuesInFilteredIdConta(response || [] as ITransferencia[])}          
          sx={{ width: 220 }}
          InputLabelProps={{
            shrink: true
          }}
        /> */}
       </Stack>    
      
      <Paper
        sx={{
          display: 'flex',
          flexDirection: 'column',
          marginTop: '10px'
        }}
      >
        <TableContainer
          component={Paper}
          sx={{ maxWidth: '90vw', overflow: 'auto' }}
        >
          <Table aria-label="simple table">
            <TableHead>             
              <TableRow hover={true}>
                <StyledTableHeaderCell>Data</StyledTableHeaderCell>
                <StyledTableHeaderCell>Quantia</StyledTableHeaderCell>
                <StyledTableHeaderCell>Tipo</StyledTableHeaderCell>
                <StyledTableHeaderCell>Nome do operador</StyledTableHeaderCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {response?.map((response: ITransferencia) => {
                return (
                  <StyledTableRowCell key={response.id}>
                    <TableCell align="left">
                      {dateFormatter(response.dataTransferencia)}
                    </TableCell>
                    <TableCell align="left">{response.valor}</TableCell>
                    <TableCell align="left">{response.tipo}</TableCell>
                    <TableCell align="left">
                      {response.nomeOperadorTransacao}
                    </TableCell>
                  </StyledTableRowCell>
                )
              })}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={10}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </Stack>
  )
}
