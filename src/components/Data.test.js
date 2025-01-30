import { render, screen } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import { LocationProvider } from 'react-router-dom';
import Data from './Data';

describe('Data Component', () => {
  it('renders flight details correctly', () => {
    const mockFlight = {
      flightNumber: 'AI202',
      airline: 'Air India',
      origin: 'New Delhi',
      destination: 'London',
      departureTime: '2025-01-30 10:00:00',
      status: 'On Time',
    };

    const history = createMemoryHistory();
    history.push('/1', { flight: mockFlight });

    render(
      <LocationProvider history={history}>
        <Data />
      </LocationProvider>
    );

    // Verify that the flight details are rendered correctly
    expect(screen.getByText('Flight Number:')).toBeInTheDocument();
    expect(screen.getByText('AI202')).toBeInTheDocument();
    expect(screen.getByText('Airline:')).toBeInTheDocument();
    expect(screen.getByText('Air India')).toBeInTheDocument();
    expect(screen.getByText('On Time')).toBeInTheDocument();
  });

  it('handles missing flight data', () => {
    const history = createMemoryHistory();
    history.push('/1');

    render(
      <LocationProvider history={history}>
        <Data />
      </LocationProvider>
    );

    // Verify error message when no flight data is passed
    expect(screen.getByText('Error: Flight data not found')).toBeInTheDocument();
  });
});
