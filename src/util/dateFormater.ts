export const dateFormatter = (date: string) => {
  const dateSplitted = date.split('T')
  const dataNumbers = dateSplitted[0].split('-')

  const year = dataNumbers[0]
  const month = dataNumbers[1]
  const day = dataNumbers[2]

  return `${day}/${month}/${year}`
}
