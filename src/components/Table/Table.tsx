import { useState } from 'react'
import { styled } from '@mui/material/styles'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell, { tableCellClasses } from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'
import TablePagination from '@mui/material/TablePagination'
import { ITransferencia } from '../../Model/ResponseModel'
import { dateFormatter } from '../../util/dateFormater'

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

interface ITabelaDados {
  response: ITransferencia[]
}

export default function BasicTable({ response }: ITabelaDados) {
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
    <Paper
      sx={{
        display: 'flex',
        flexDirection: 'column'
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
            {response ? (
              response
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((response: ITransferencia) => {
                  return (
                    <StyledTableRowCell key={response.id}>
                      <TableCell align="left">
                        {dateFormatter(response.dataTransferencia)}
                      </TableCell>
                      <TableCell align="left">
                        {`R$ ${response.valor.toFixed(2)}`}
                      </TableCell>
                      <TableCell align="left">{response.tipo}</TableCell>
                      <TableCell align="left">
                        {response.nomeOperadorTransacao}
                      </TableCell>
                    </StyledTableRowCell>
                  )
                })
            ) : (
              <p>Nenhuma resposta</p>
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={response.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  )
}
