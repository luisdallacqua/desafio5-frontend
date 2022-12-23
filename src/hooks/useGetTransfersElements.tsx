import axios from 'axios'
import { useEffect, useState } from 'react'
import { IError } from '../Model/ErrorModel'
import { ITransferencia } from '../Model/ResponseModel'

export const useGetTransfersElements = (URL: string) => {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const [response, setResponse] = useState<ITransferencia[]>(
    [] as ITransferencia[]
  )
  const [responseWithFilter, setResponseWithFilter] = useState<
    ITransferencia[]
  >([] as ITransferencia[])

  const getElementsWithFiltersInConta = async () => {
    setError(false)
    setLoading(true)

    try {
      const returnData = axios.get(`${URL.split('?')[0]}`).then((res) => {
        return res.data.content
      })
      setResponse(await returnData)

      const returnDataFiltered = axios.get(`${URL}`).then((res) => {
        return res.data.content
      })
      setResponseWithFilter(await returnDataFiltered)
    } catch (err) {
      setError(true)
      if (axios.isAxiosError(err) && err.response) {
        setErrorMessage((err.response?.data as IError).details)
      }
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    getElementsWithFiltersInConta()
  }, [URL])

  return { loading, error, errorMessage, response, responseWithFilter }
}
