import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import Navbar from '@components/Navbar/Navbar'
import axios from 'axios'
import { baseUrl } from '@service/config'

jest.mock('axios'); // Mock the axios module
jest.mock('@store/AuthContext', () => {
  // Mock the useCurrentUser hook
  return {
    useCurrentUser: () => ({
      user: { id: 1, balance: 20 }, // Mock user object
      updateUserBalance: jest.fn(),
    }),
  }
})
jest.mock('@service/auth', () => {
  return {
    retrieveToken: () => ("mock-token"),
    removeToken: () => {}
  }
})


describe('Navbar', () => {
  afterEach(() => {
    jest.clearAllMocks() // Clean up mocks after each test
  });
  test('renders app title', () => {
    render(
      <Navbar />
    )
    const titleElement = screen.getByText(/Calculator App/i)
    expect(titleElement).toBeInTheDocument()
  })
  test('displays user balance if user is logged in', () => {
    // Use the actual AuthProvider to provide context
    render(
        <Navbar />
    );

    const balanceElement = screen.getByText(/Balance: 20 credits/i);
    console.log(balanceElement)
    expect(balanceElement).toBeInTheDocument()
  });

  test('displays top-up and logout buttons if user is logged in', () => {
    render(<Navbar />);

    const topupButton = screen.getByText(/Top up credits/i)
    const logoutButton = screen.getByText(/Logout/i)

    expect(topupButton).toBeInTheDocument()
    expect(logoutButton).toBeInTheDocument()
  });

  test('calls handleTopup function when top-up button is clicked', async () => {
    // Render the Navbar component
    render(<Navbar />);
  
    // Mock the axios post function
    const mockAxiosPost = jest.spyOn(axios, 'post').mockResolvedValueOnce({
      data: { balance: 20 },
    });
  
    // Simulate a click on the "Top up credits" button
    const topupButton = screen.getByText(/Top up credits/i);
    fireEvent.click(topupButton)
  
    // Wait for async actions to complete
    await screen.findByText(/Balance: 20 credits/i);
  
    // Check if the axios post function is called correctly
    expect(mockAxiosPost).toHaveBeenCalled();
    expect(mockAxiosPost).toHaveBeenCalledWith(
      `${baseUrl}/calculator/api/v1/users/topup?userId=1`,
      null,
      { headers: { Authorization: 'Bearer mock-token' } }
    );
  
    // Clean up
    mockAxiosPost.mockRestore()
  });
})