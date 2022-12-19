import React, { Dispatch, SetStateAction } from 'react'
import { Divider, IconButton, InputBase, Paper } from '@mui/material'
import SearchIcon from '@mui/icons-material/Search'
import SendIcon from '@mui/icons-material/Send'

type SearchProps = {
  search: string
  setSearch: Dispatch<SetStateAction<string>>
  placeholder?: string
  // baseURL: string
  // setURL: Dispatch<SetStateAction<string>>
}

const PaperStyle = {
  p: '2px 4px',
  display: 'flex',
  alignItems: 'center',
  backgroundColor: 'grey.200',
  maxWidth: 400,
  margin: '1rem 0'
}

function SearchInput({
  search,
  setSearch,
  placeholder = 'Valor a ser consultado'
}: SearchProps) {
  return (
    <Paper component="form" sx={PaperStyle} elevation={0}>
      <SearchIcon color="secondary" />

      <InputBase
        sx={{ ml: 1, flex: 1 }}
        placeholder={placeholder}
        inputProps={{ 'aria-label': 'search for character' }}
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
      <IconButton
        color="secondary"
        sx={{ p: '10px' }}
        aria-label="directions"
        // onClick={() => setURL(`${baseURL}?name=${search}`)}
        onClick={() => console.log(search)}
      >
        <SendIcon />
      </IconButton>
    </Paper>
  )
}

export default SearchInput
