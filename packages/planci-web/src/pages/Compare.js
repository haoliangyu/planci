import React, { useState, useEffect } from 'react';
import Header from '../components/Header'; // Import Header component
import AmountInput from '../components/AmountInput'; // Import AmountInput component
import Calculator from '../components/Calculator'; // Import Calculator component

const Compare = () => {
  const [amount, setAmount] = useState('');
  const [calculators, setCalculators] = useState([]);

  const addCalculator = () => {
    setCalculators([...calculators, calculators.length]);
  };

  useEffect(() => {
    // Trigger re-render of calculators when amount changes
    setCalculators([...calculators]);
  }, [amount]);

  return (
    <div>
      <Header />
      <div className="container mx-auto px-4 py-8 flex flex-col space-y-8 mt-20">
        <div className="text-center">
          <h1 className="text-4xl font-extrabold mb-4 text-gray-800">Compare Your Plan Proposals</h1>
          <p className="text-lg text-gray-700 mb-2">Create different pay-over-time plans and compare their payment details</p>
        </div>
        <div className="text-center">
          <label className="block text-lg font-medium text-gray-700 mb-2">Enter amount:</label>
          <div className="mx-auto" style={{ maxWidth: '200px' }}>
            <AmountInput amount={amount} setAmount={setAmount} isAmountValid={true} /> {/* Use AmountInput component */}
          </div>
          <div className="mt-4">
            <button className="text-black underline font-medium hover:text-black" onClick={addCalculator}>Add plans</button>
          </div>
        </div>
        <div id="compare-plans" className="grid grid-cols-1 md:grid-cols-2 gap-4 mx-auto">
          {calculators.map((key) => (
            <div key={key} style={{ width: '300px' }}>
              <Calculator initialAmount={amount} hideAmountInput={true} /> {/* Pass amount to Calculator component and hide amount input */}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Compare;
