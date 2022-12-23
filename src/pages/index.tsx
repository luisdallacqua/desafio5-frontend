import { useState } from 'react'
import { ITransferencia } from '../Model/ResponseModel'
import { Alert, AlertTitle, CircularProgress, Stack } from '@mui/material'
import BasicTable from '../components/Table/Table'
import FilterForm from '../components/FilterForm/FilterForm'
import {
  getTotalValueOfResponse,
  stringFormatterToFitURL
} from '../util/helpers'
import { useGetTransfersElements } from '../hooks/useGetTransfersElements'
import BalanceValues from '../components/balanceValues/BalanceValues'

export default function Index() {
  const [idDaConta, setIdDaConta] = useState('2')
  const [dataInicio, setDataInicio] = useState('')
  const [dataFim, setDataFim] = useState('')
  const [operador, setOperador] = useState('')

  const [URL, setURL] = useState(
    `http://localhost:8080/transferencias/${idDaConta}`
  )

  const handleFilterUrl = (
    dataInicio: string,
    dataFim: string,
    operador: string
  ) => {
    setURL(
      `http://localhost:8080/transferencias/${idDaConta}?${
        dataInicio ? `dataInicio=${dataInicio}&` : ''
      }${dataFim ? `dataFim=${dataFim}&` : ''}${
        operador ? `operador=${stringFormatterToFitURL(operador)}` : ''
      }`
    )
  }

  const nameToBeDisplayedAndValueOfTransfersInConta = (
    nameToBeDisplayed: string,
    responseTotal: ITransferencia[]
  ) => {
    return `${nameToBeDisplayed} ${getTotalValueOfResponse(
      responseTotal || ([] as ITransferencia[])
    ).toFixed(2)}`
  }

  const {
    response: responseTotal,
    responseWithFilter: response,
    error,
    errorMessage,
    loading
  } = useGetTransfersElements(URL)

  return (
    <Stack maxWidth="75vw" margin="8em auto">
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
      {loading ? (
        <CircularProgress />
      ) : error ? (
        <Alert severity="error">
          <AlertTitle>
            {errorMessage ||
              'Verifique os filtros e tente novamente, é preciso informar ao menos o ID da conta. Os ids disponíveis são: 1,2,3,4'}
          </AlertTitle>
        </Alert>
      ) : (
        <>
          <BalanceValues
            responseTotal={nameToBeDisplayedAndValueOfTransfersInConta(
              'VALOR TOTAL : R$',
              responseTotal
            )}
            response={nameToBeDisplayedAndValueOfTransfersInConta(
              'VALOR NO PERÍODO : R$',
              response
            )}
          />
          <BasicTable response={response || ([] as ITransferencia[])} />
        </>
      )}
    </Stack>
  )
}
