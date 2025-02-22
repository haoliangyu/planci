import React, { useState } from 'react';

const Calculator = () => {
  const [input, setInput] = useState(''); // State to store the input

  const handleButtonClick = (value) => {
    setInput(input + value); // Append the clicked button value to the input
  };

  const handleClear = () => {
    setInput(''); // Clear the input
  };

  const handleCalculate = () => {
    try {
      setInput(eval(input).toString()); // Evaluate the input and set the result
    } catch {
      setInput('Error'); // Set input to 'Error' if evaluation fails
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg">
      <div className="mb-4">
        <input
          type="text"
          value={input}
          readOnly
          className="w-full p-2 text-right border border-gray-300 rounded"
        />
      </div>
      <div className="grid grid-cols-4 gap-2">
        {['7', '8', '9', '/'].map((value) => (
          <button
            key={value}
            onClick={() => handleButtonClick(value)}
            className="p-4 bg-gray-200 rounded"
          >
            {value}
          </button>
        ))}
        {['4', '5', '6', '*'].map((value) => (
          <button
            key={value}
            onClick={() => handleButtonClick(value)}
            className="p-4 bg-gray-200 rounded"
          >
            {value}
          </button>
        ))}
        {['1', '2', '3', '-'].map((value) => (
          <button
            key={value}
            onClick={() => handleButtonClick(value)}
            className="p-4 bg-gray-200 rounded"
          >
            {value}
          </button>
        ))}
        {['0', '.', '=', '+'].map((value) => (
          <button
            key={value}
            onClick={value === '=' ? handleCalculate : () => handleButtonClick(value)}
            className="p-4 bg-gray-200 rounded"
          >
            {value}
          </button>
        ))}
        <button onClick={handleClear} className="col-span-4 p-4 bg-red-500 text-white rounded">
          Clear
        </button>
      </div>
    </div>
  );
};

export default Calculator;
