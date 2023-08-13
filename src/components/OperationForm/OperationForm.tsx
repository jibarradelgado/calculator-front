import React, { useState, useEffect } from 'react'
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
  Button,
  Typography,
  Container,
  Checkbox,
  FormControlLabel,
} from '@mui/material'
import axios from 'axios'
import { useCurrentUser } from '@store/AuthContext'
import { retrieveToken } from '@service/auth'
import { baseUrl, TOKEN_KEY } from '@service/config'

interface Operation {
  id: number
  type: string
  cost: number
}

interface Props {
  onUpdateRecords: () => void
}

const OperationForm: React.FC<Props> = ({
  onUpdateRecords,
}) => {
  const { user, updateUserBalance } = useCurrentUser()
  const [selectedOperation, setSelectedOperation ] = useState('')
  const [operations, setOperations] = useState([] as Operation[])
  const [ number1, setNumber1 ] = useState(0.0)
  const [ number2, setNumber2 ] = useState(0.0)
  const [ operationResult, setOperationResult ] = useState('')
  const [ numStrings, setNumStrings] = useState(1)
  const [ stringLength, setStringLength ] = useState(1)
  const [ includeDigits, setIncludeDigits ] = useState(true)
  const [ includeUpperAlpha, setIncludeUpperAlpha ] = useState(true)
  const [ includeLowerAlpha, setIncludeLowerAlpha ] = useState(true)
  const [ unique, setUnique ] = useState(true)
  
  useEffect(() => {
    const getOperations = async () => {
      const token = `Bearer ${await retrieveToken()}`
      axios.get(`${baseUrl}/calculator/api/v1/operations`, {
        headers: {
          Authorization: token
        }
      })
        .then(res => { 
          setOperations(res.data as Operation[])
        })
        .catch(err =>{
          console.log(err)
          setOperations([] as Operation[])
        })
    }

    getOperations()
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const token = `Bearer ${await retrieveToken()}`
    switch (selectedOperation) {
      case 'ADDITION':
        axios.post(`${baseUrl}/calculator/api/v1/calculator/addition`, {
          userId: user?.id,
          num1: number1,
          num2: number2
        }, {
          headers: {
            Authorization: token
          }
        })
        .then(res => {
          const operation = operations.find(elem => elem.type == 'ADDITION')
          if(operation && user) {
            updateUserBalance(user.balance - operation.cost)
          }
          setOperationResult(`${number1} + ${number2} = ${res.data}`)
          onUpdateRecords()
        })
        .catch(err => {
          console.log(err)
        })
        break;
      case 'SUBTRACTION':
        axios.post(`${baseUrl}/calculator/api/v1/calculator/subtraction`, {
          userId: user?.id,
          num1: number1,
          num2: number2
        }, {
          headers: {
            Authorization: token
          }
        })
        .then(res => {
          const operation = operations.find(elem => elem.type == 'SUBTRACTION')
          if(operation && user) {
            updateUserBalance(user.balance - operation.cost)
          }
          setOperationResult(`${number1} - ${number2} = ${res.data}`)
          onUpdateRecords()
        })
        .catch(err => {
          console.log(err)
        })
        break;
      case 'MULTIPLICATION':
        axios.post(`${baseUrl}/calculator/api/v1/calculator/multiplication`, {
          userId: user?.id,
          num1: number1,
          num2: number2
        }, {
          headers: {
            Authorization: token
          }
        })
        .then(res => {
          const operation = operations.find(elem => elem.type == 'MULTIPLICATION')
          if(operation && user) {
            updateUserBalance(user.balance - operation.cost)
          }
          setOperationResult(`${number1} * ${number2} = ${res.data}`)
          onUpdateRecords()
        })
        .catch(err => {
          console.log(err)
        })
        break;
      case 'DIVISION':
        axios.post(`${baseUrl}/calculator/api/v1/calculator/division`, {
          userId: user?.id,
          num1: number1,
          num2: number2
        }, {
          headers: {
            Authorization: token
          }
        })
        .then(res => {
          const operation = operations.find(elem => elem.type == 'DIVISION')
          if(operation && user) {
            updateUserBalance(user.balance - operation.cost)
          }
          setOperationResult(`${number1} / ${number2} = ${res.data}`)
          onUpdateRecords()
        })
        .catch(err => {
          console.log(err)
        })
        break;
      case 'SQUARE_ROOT':
        axios.post(`${baseUrl}/calculator/api/v1/calculator/square_root`, {
          userId: user?.id,
          num1: number1,
        }, {
          headers: {
            Authorization: token
          }
        })
        .then(res => {
          const operation = operations.find(elem => elem.type == 'SQUARE_ROOT')
          if(operation && user) {
            updateUserBalance(user.balance - operation.cost)
          }
          setOperationResult(`√${number1} = ${res.data}`)
          onUpdateRecords()
        })
        .catch(err => {
          console.log(err)
        })
        break;
      case 'RANDOM_STRING':
        axios.post(`${baseUrl}/calculator/api/v1/randomstring`, {
          userId: user?.id,
          num: numStrings,
          len: stringLength,
          digits: includeDigits,
          upperAlpha: includeUpperAlpha,
          lowerAlpha: includeLowerAlpha,
          unique: unique,
        }, {
          headers: {
            Authorization: token
          }
        })
        .then(res => {
          const operation = operations.find(elem => elem.type == 'RANDOM_STRING')
          if(operation && user) {
            updateUserBalance(user.balance - operation.cost)
          }
          setOperationResult(`${res.data}`)
          onUpdateRecords()
        })
        .catch(err => {
          console.log(err)
        })
        break;
    }

  }

  return (
    <>
    <Container maxWidth="sm" sx={{ mt: 3}}>
      <form onSubmit={handleSubmit}>
        <Typography variant='h6'>New Operation</Typography>
        <FormControl fullWidth margin='normal' >
          <InputLabel >Operation</InputLabel>
          <Select aria-label='Operation' value={selectedOperation} onChange={(e) => {
            setSelectedOperation(e.target.value)
            }}>
            {
              operations && operations.map((operation) => (
                <MenuItem key={operation.id} value={operation.type}>
                  {operation.type}
                </MenuItem>
              ))
            }
          </Select>
        </FormControl>
        {selectedOperation !== 'RANDOM_STRING' && selectedOperation !== 'RANDOM_STRING' && 
          (<div>
            <TextField 
              label="Number 1"
              value={number1}
              onChange={(e) => setNumber1(Number(e.target.value))}
              margin='normal'
              variant='outlined'
              fullWidth
            />
            {
              selectedOperation !== 'SQUARE_ROOT' && 
              <TextField 
              label="Number 2"
              value={number2}
              onChange={(e) => setNumber2(Number(e.target.value))}
              margin='normal'
              variant='outlined'
              fullWidth
            />
            }
          </div>)
        }
        {selectedOperation === 'RANDOM_STRING' && (
  <div>
    <TextField 
      label="Number of Strings"
      value={numStrings}
      type='number'
      onChange={(e) => setNumStrings(Number(e.target.value))}
      margin='normal'
      variant='outlined'
      fullWidth
    />
    <TextField 
      label="Length of Strings"
      value={stringLength}
      type='number'
      onChange={(e) => setStringLength(Number(e.target.value))}
      margin='normal'
      variant='outlined'
      fullWidth
    />
    <FormControlLabel
      control={
        <Checkbox
          checked={includeDigits}
          onChange={(e) => setIncludeDigits(e.target.checked)}
        />
      }
      label="Include Digits"
    />
    <FormControlLabel
      control={
        <Checkbox
          checked={includeUpperAlpha}
          onChange={(e) => setIncludeUpperAlpha(e.target.checked)}
        />
      }
      label="Include Uppercase Letters"
    />
    <FormControlLabel
      control={
        <Checkbox
          checked={includeLowerAlpha}
          onChange={(e) => setIncludeLowerAlpha(e.target.checked)}
        />
      }
      label="Include Lowercase Letters"
    />
    <FormControlLabel
      control={
        <Checkbox
          checked={unique}
          onChange={(e) => setUnique(e.target.checked)}
        />
      }
      label="Unique Strings"
    />
  </div>
)}
        {/* More conditional rendering for other operations */}
        <Button type="submit" variant="contained" color="primary">
          Perform Operation
        </Button>
      </form>
      <Container sx={{mt:4}}>
        <Typography variant='body1'>Operation: {operationResult}</Typography>
      </Container>
    </Container>
    </>
  )
}

export default OperationForm