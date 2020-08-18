import React from 'react';
import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Dropdown from 'react-bootstrap/Dropdown';

const StockForm = ({ handleInput, handleTime, handlePercent, ticker }) => {
  const options = [
    '1 Week',
    '2 Weeks',
    '1 Month',
    '3 Months',
    '6 Months',
    '1 Year',
  ];

  return (
    <InputGroup>
      <FormControl
        placeholder="Stock Ticker"
        defaultValue={ticker}
        aria-label="Stock Ticker"
        aria-describedby="basic-addon2"
        onInput={handleInput}
      />

      <DropdownButton
        as={InputGroup.Append}
        variant="outline-light"
        title="Select Timeframe"
        id="input-group-dropdown-2"
        onSelect={handleTime}
      >
        {options.map((v, i) => {
          return (
            <Dropdown.Item eventKey={v} key={i}>
              {v}
            </Dropdown.Item>
          );
        })}
      </DropdownButton>
      <DropdownButton
        as={InputGroup.Append}
        variant="outline-light"
        title="Select Percent"
        id="input-group-dropdown-2"
        onSelect={handlePercent}
      >
        <Dropdown.Item eventKey={1.03}>3%</Dropdown.Item>
        <Dropdown.Item eventKey={1.04}>4%</Dropdown.Item>
        <Dropdown.Item eventKey={1.05}>5%</Dropdown.Item>
        <Dropdown.Item eventKey={1.06}>6%</Dropdown.Item>
        <Dropdown.Item eventKey={1.07}>7%</Dropdown.Item>
        <Dropdown.Item eventKey={1.08}>8%</Dropdown.Item>
        <Dropdown.Item eventKey={1.09}>9%</Dropdown.Item>
        <Dropdown.Item eventKey={1.1}>10%</Dropdown.Item>
      </DropdownButton>
    </InputGroup>
  );
};

export default StockForm;
