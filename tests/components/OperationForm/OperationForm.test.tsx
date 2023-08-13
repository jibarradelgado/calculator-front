import React from 'react'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import axios from 'axios'
import OperationForm from '@components/OperationForm/OperationForm' // Adjust the path to the component file
import { act } from 'react-dom/test-utils'

jest.mock('axios')
const mockedAxios = axios as jest.Mocked<typeof axios>;
jest.mock('@store/AuthContext', () => ({
  useCurrentUser: () => ({
    user: { id: 1, balance: 20 }, // Mock user object
    updateUserBalance: jest.fn(),
  }),
}))

describe('OperationForm', () => {
  it('renders operation form with initial values', async () => {
    mockedAxios.get.mockResolvedValue({
      data: [
        {
          "id": 1,
          "type": "ADDITION",
          "cost": 1
        },
        {
          "id": 2,
          "type": "SUBTRACTION",
          "cost": 1
        },
        {
          "id": 3,
          "type": "MULTIPLICATION",
          "cost": 2
        },
        {
          "id": 4,
          "type": "DIVISION",
          "cost": 2
        },
        {
          "id": 5,
          "type": "SQUARE_ROOT",
          "cost": 3
        },
        {
          "id": 6,
          "type": "RANDOM_STRING",
          "cost": 4
        }
      ]
    })

    await act(async () => {
      render(<OperationForm onUpdateRecords={jest.fn()} />)
    })

    const operationSelect = screen.getByLabelText('Operation')
    const number1Input = screen.getByLabelText('Number 1')
    const number2Input = screen.getByLabelText('Number 2')
    const performButton = screen.getByText('Perform Operation')

    expect(operationSelect).toBeInTheDocument()
    expect(number1Input).toBeInTheDocument()
    expect(number2Input).toBeInTheDocument()
    expect(performButton).toBeInTheDocument()
  })
})