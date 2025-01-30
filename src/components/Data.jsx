import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router';

const Data = () => {
  const location = useLocation();
  const { flight } = location.state || {}; // Receive the passed data
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!flight) {
      setLoading(true);
    }
  }, [flight]);

  if (loading) {
    return (
      <div className="flex justify-center items-center ">
        <div className="text-xl font-semibold">Loading...</div>
      </div>
    );
  }

  if (!flight) {
    return (
      <div className="flex justify-center items-center ">
        <div className="text-xl font-semibold text-red-500">Error: Flight data not found</div>
      </div>
    );
  }

  return (
    <div className="flex justify-center items-center  bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-3xl w-full">
        <h2 className="text-3xl font-semibold text-center mb-6">Flight Details</h2>
        <div className="space-y-4">
          <div className="flex justify-between">
            <span className="font-medium text-gray-600">Flight Number:</span>
            <span>{flight.flightNumber}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-medium text-gray-600">Airline:</span>
            <span>{flight.airline}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-medium text-gray-600">Origin:</span>
            <span>{flight.origin}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-medium text-gray-600">Destination:</span>
            <span>{flight.destination}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-medium text-gray-600">Departure Time:</span>
            <span>{flight.departureTime}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-medium text-gray-600">Status:</span>
            <span className={`font-semibold ${flight.status === 'On Time' ? 'text-green-500' : flight.status === 'Delayed' ? 'text-red-500' : 'text-yellow-500'}`}>
              {flight.status}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Data;
