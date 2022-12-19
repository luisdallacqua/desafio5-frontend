import { Button, Stack, TextField } from '@mui/material'
import React, { Dispatch, SetStateAction } from 'react'
import SearchIcon from '@mui/icons-material/Search'

type IFilterForm = {
  idDaConta: string
  setIdDaConta: Dispatch<SetStateAction<string>>
  dataInicio: string
  setDataInicio: Dispatch<SetStateAction<string>>
  dataFim: string
  setDataFim: Dispatch<SetStateAction<string>>
  operador: string
  setOperador: Dispatch<SetStateAction<string>>
  handleFilterUrl: (
    dataInicio: string,
    dataFim: string,
    operador: string
  ) => void
}

const FilterForm = ({
  idDaConta,
  setIdDaConta,
  dataInicio,
  setDataInicio,
  dataFim,
  setDataFim,
  operador,
  setOperador,
  handleFilterUrl
}: IFilterForm) => {
  return (
    <>
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
    </>
  )
}

export default FilterForm
