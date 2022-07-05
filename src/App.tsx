import React from 'react';
import './App.css';

import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { searchCompanies } from './data/request';

function App() {
  const onClick = async () => {
    const json = await searchCompanies("Tesco")
    console.log("json", json)
  }

  return (
  <Box component="form"
  sx={{
    '& > :not(style)': { m: 1, width: '25ch' },
  }}
  noValidate
  autoComplete="off"
>
  <TextField id="outlined-basic" label="Company name" variant="outlined" />
  <Button variant="contained" onClick={onClick}>Search</Button>
  
</Box>)
}

export default App;
