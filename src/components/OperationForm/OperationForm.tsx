import React, { useState, useEffect } from 'react';
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
  Button,
  Typography,
  Container,
} from '@mui/material';

const OperationForm = () => {
  const [selectedOperation, setSelectedOperation ] = useState('addition');
  const [ number1, setNumber1 ] = useState(0.0);
  const [ number2, setNumber2 ] = useState(0.0);

  return (
    <>
      <form>
        <Typography variant='h6'>New Operation</Typography>
        <FormControl fullWidth margin='normal'>
          <InputLabel>Operation</InputLabel>
          <Select>
            <MenuItem>Addition</MenuItem>
          </Select>
        </FormControl>
        <div>
          <TextField 
            label="Number 1"
            value={number1}
            onChange={(e) => setNumber1(1)}
            margin='normal'
            variant='outlined'
            fullWidth
          />
          <TextField 
            label="Number 2"
            value={number2}
            onChange={(e) => setNumber2(2)}
            margin='normal'
            variant='outlined'
            fullWidth
          />
        </div>  
        {/* More conditional rendering for other operations */}
        <Button type="submit" variant="contained" color="primary">
          Perform Operation
        </Button>
      </form>
      <Container>
        <Typography variant='body1'>Operation: 2 + 2 = 4</Typography>
      </Container>
    </>
  )
}

export default OperationForm