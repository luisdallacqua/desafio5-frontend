import React from 'react'
import { Stack, Typography } from '@mui/material'

interface IBalanceValues {
  responseTotal: string
  response: string
}

const BalanceValues = ({ responseTotal, response }: IBalanceValues) => {
  return (
    <Stack
      direction="row"
      justifyContent="space-evenly"
      p={2}
      mt={2}
      mb={1}
      borderRadius={2}
      sx={{
        backgroundColor: '#424242'
      }}
    >
      <Typography variant="body1" color="white">
        {responseTotal}
      </Typography>
      <Typography variant="body1" color="white">
        {response}
      </Typography>
    </Stack>
  )
}

export default BalanceValues
