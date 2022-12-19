export const dateFormatter = (date: string) => {
  const dateSplitted = date.split('T')
  const dataNumbers = dateSplitted[0].split('-')

  const year = dataNumbers[0]
  const month = dataNumbers[1]
  const day = dataNumbers[2]

  console.log(dataNumbers)
  console.log(`return é ${day}/${month}/${year}`)
  return `${day}/${month}/${year}`
}
