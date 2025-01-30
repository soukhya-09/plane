import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router';

const GetData = () => {
  const nav = useNavigate();

  const handleclick = (flight) => {
    nav(`/${flight.id}`, {
      state: { flight }, // Send the flight data to the Data component
    });
  };

  const [data, setData] = useState([]);

  const fetchData = async () => {
    try {
      const api = "https://flight-status-mock.core.travelopia.cloud/flights";
      const response = await axios.get(api);
      setData(response.data);
    } catch (error) {
      console.error("Error fetching data: ", error);
    }
  };

  useEffect(() => {
    fetchData();

    const intervalId = setInterval(() => {
      fetchData();
    }, 10000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="text-center">
      <h1 className="text-white mb-4">Fetch Flight Data</h1>
      <table className="min-w-full table-auto border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-200">
            <th className="py-2 px-4 border border-gray-300">Flight Number</th>
            <th className="py-2 px-4 border border-gray-300">Airline</th>
            <th className="py-2 px-4 border border-gray-300">Origin</th>
            <th className="py-2 px-4 border border-gray-300">Destination</th>
            <th className="py-2 px-4 border border-gray-300">Departure Time</th>
            <th className="py-2 px-4 border border-gray-300">Status</th>
          </tr>
        </thead>
        <tbody>
          {data.map((flight) => (
            <tr
              key={flight.flightNumber}
              onClick={() => handleclick(flight)} // Send flight data on click
              className="hover:bg-gray-100 cursor-pointer"
            >
              <td className="py-2 px-4 border border-gray-300">{flight.flightNumber}</td>
              <td className="py-2 px-4 border border-gray-300">{flight.airline}</td>
              <td className="py-2 px-4 border border-gray-300">{flight.origin}</td>
              <td className="py-2 px-4 border border-gray-300">{flight.destination}</td>
              <td className="py-2 px-4 border border-gray-300">{flight.departureTime}</td>
              <td
                className={`py-2 px-4 border border-gray-300 ${
                  flight.status === 'On Time'
                    ? 'text-green-500'
                    : flight.status === 'Delayed'
                    ? 'text-red-500'
                    : 'text-yellow-500'
                }`}
              >
                {flight.status}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default GetData;
