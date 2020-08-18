import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Table from 'react-bootstrap/Table';
import StockForm from './StockForm';
import useDebounce from '../hooks/useDebounce';

const timeOffsets = {
  '1 Week': 604800,
  '2 Weeks': 1209600,
  '1 Month': 2592000,
  '3 Months': 7776000,
  '6 Months': 15552000,
  '1 Year': 31536000,
};

const Application = () => {
  const today = Math.floor(Date.now() / 1000);
  const [stockData, setStockData] = useState({
    o: [],
    h: [],
    p: [],
    date: [],
    total: 0,
  });
  const [ticker, setTicker] = useState('');
  const [time, setTime] = useState(today - timeOffsets['1 Week']);
  const [percent, setPercent] = useState(1.03);
  const [isSearching, setIsSearching] = useState(false);

  const debouncedTicker = useDebounce(ticker, 500);

  let URL = `http://localhost:3001/api/v1/stocks/percent-above/ticker=${debouncedTicker}&percent=${percent}&time=${time}`;

  const handleInput = (e) => {
    setTicker(e.target.value.toUpperCase());
  };

  const handleTime = (e) => {
    setTime(today - timeOffsets[e]);
  };

  const handlePercent = (e) => {
    setPercent(e);
  };

  useEffect(() => {
    if (debouncedTicker) {
      setIsSearching(true);

      axios
        .get(URL)
        .then(function (response) {
          const results = response.data;
          setStockData((p) => {
            return { ...p, ...results };
          });
          setIsSearching(false);
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  }, [URL, debouncedTicker]);

  return (
    <>
      <StockForm
        handleInput={handleInput}
        handleTime={handleTime}
        handlePercent={handlePercent}
        ticker={ticker}
      />
      <Table striped bordered hover variant="dark">
        <thead>
          <tr>
            <th>DATE</th>
            <th>OPENING</th>
            <th>HIGH</th>
            <th>GAIN</th>
          </tr>
        </thead>
        <tbody>
          {stockData.date.map((v, i) => {
            return (
              <tr key={i}>
                <td>{stockData.date[i]}</td>
                <td>${stockData.o[i]}</td>
                <td>${stockData.h[i]}</td>
                <td>{stockData.p[i]}%</td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    </>
  );
};

export default Application;
