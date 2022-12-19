import { useEffect, useState } from 'react'
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
import SearchBar from '../components/SearchInput'
import { TextField } from '@mui/material'

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

const maxSizeAvatar = {
  maxWidth: '60px',
  maxHeight: '60px'
}

const sizeOfNameToTrim = 30

export default function BasicTable() {
  useEffect(() => {
    axios.get('http://localhost:8080/transferencias/').then((res: any) => {
      console.log(res)
      setResponse(res.data)
    })
  }, [])

  const [response, setResponse] = useState<ITransferencia[]>()
  const [dataInicio, setDataInicio] = useState('')
  const [dataFim, setDataFim] = useState('')
  const [operador, setOperador] = useState('')
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(5)

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(+event.target.value)
    setPage(0)
  }

  return (
    <>
      <SearchBar
        search={dataInicio}
        setSearch={setDataInicio}
        placeholder="Data inicio (01/01/2000) "
      />
      <SearchBar
        search={dataFim}
        setSearch={setDataFim}
        placeholder="Data fim (01/01/2000) "
      />
      <SearchBar
        search={operador}
        setSearch={setOperador}
        placeholder="Nome do operador"
      />

      <Paper
        sx={{
          maxWidth: '50vw',
          display: 'flex',
          flexDirection: 'column',
          margin: '0 auto'
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
                      {response.dataTransferencia}
                    </TableCell>
                    <TableCell align="left">{response.valor}</TableCell>
                    <TableCell align="left">{response.tipo}</TableCell>
                    <TableCell align="left">
                      {response.nomeOperadorTransacao}
                    </TableCell>
                  </StyledTableRowCell>
                )
              })}
              <StyledTableRowCell>
                <TableCell align="left">14/02/2022</TableCell>
                <TableCell align="left">R$ 30895,46</TableCell>
                <TableCell align="left">depósito</TableCell>
                <TableCell align="left">Fulano</TableCell>
              </StyledTableRowCell>
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
    </>
  )
}
