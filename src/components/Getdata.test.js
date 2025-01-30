import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import GetData from './Getdata';
import axios from 'axios';
import { BrowserRouter as Router } from 'react-router-dom';

// Mock the Axios module
jest.mock('axios');

describe('GetData Component', () => {
  const mockData = [
    {
      flightNumber: 'AI202',
      airline: 'Air India',
      origin: 'New Delhi',
      destination: 'London',
      departureTime: '2025-01-30 10:00:00',
      status: 'On Time',
      id: 1,
    },
    {
      flightNumber: 'BA123',
      airline: 'British Airways',
      origin: 'London',
      destination: 'New York',
      departureTime: '2025-01-30 12:00:00',
      status: 'Delayed',
      id: 2,
    },
  ];

  it('renders flight data correctly', async () => {
    // Mock API response
    axios.get.mockResolvedValueOnce({ data: mockData });

    render(
      <Router>
        <GetData />
      </Router>
    );

    // Wait for data to be fetched and rendered
    await waitFor(() => screen.getByText('Flight Number'));

    // Check that the flight data is rendered
    expect(screen.getByText('AI202')).toBeInTheDocument();
    expect(screen.getByText('Air India')).toBeInTheDocument();
    expect(screen.getByText('On Time')).toBeInTheDocument();
  });

  it('navigates to the Data component when a row is clicked', async () => {
    axios.get.mockResolvedValueOnce({ data: mockData });

    render(
      <Router>
        <GetData />
      </Router>
    );

    // Wait for the table to load
    await waitFor(() => screen.getByText('Flight Number'));

    // Find the row and click it
    const row = screen.getByText('AI202').closest('tr');
    fireEvent.click(row);

    // Since we're using react-router, test for navigation
    expect(window.location.pathname).toBe('/1');
  });

  it('handles error fetching data', async () => {
    // Mock failed API response
    axios.get.mockRejectedValueOnce(new Error('Failed to fetch'));

    render(
      <Router>
        <GetData />
      </Router>
    );

    await waitFor(() => screen.getByText('Error fetching data:'));

    expect(screen.getByText('Error fetching data:')).toBeInTheDocument();
  });
});
