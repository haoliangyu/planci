import React, { useState } from 'react';
import Header from '../components/Header'; // Import Header component
import AmountInput from '../components/AmountInput'; // Import AmountInput component

const Compare = () => {
  const [amount, setAmount] = useState('');

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
        </div>
      </div>
    </div>
  );
};

export default Compare;
