import { ITransferencia } from '../Model/ResponseModel'

export const dateFormatter = (date: string) => {
  const dateSplitted = date.split('T')
  const dataNumbers = dateSplitted[0].split('-')

  const year = dataNumbers[0]
  const month = dataNumbers[1]
  const day = dataNumbers[2]

  return `${day}/${month}/${year}`
}

export const stringFormatterToFitURL = (name: string) => {
  return name.charAt(0).toUpperCase() + name.slice(1).toLowerCase()
}

export const getTotalValueOfResponse = (responseTotal: ITransferencia[]) => {
  return responseTotal
    ?.map((res) => res.valor)
    .reduce((prev, next) => prev + next, 0)
}
