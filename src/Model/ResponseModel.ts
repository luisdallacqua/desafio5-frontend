export interface IConta {
  id: number
  nomeResponsavel: string
}

export interface ITransferencia {
  id: number
  dataTransferencia: string
  valor: number
  nomeOperadorTransacao: string
  tipo: string
  conta: IConta
}
