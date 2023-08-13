import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import Login from '@components/Login/Login' // Update the path to the Login component

describe('Login', () => {
  test('renders login form with email and password fields', () => {
    render(<Login />)

    const emailInput = screen.getByText('Email Address')
    const passwordInput = screen.getByText('Password')
    const submitButton = screen.getByRole('button', { name: 'Submit' })

    expect(emailInput).toBeInTheDocument()
    expect(passwordInput).toBeInTheDocument()
    expect(submitButton).toBeInTheDocument()
  })
})