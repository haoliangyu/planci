import React from 'react';

const AmountInput = ({ amount, setAmount, isAmountValid }) => {
  const handleAmountChange = (e) => {
    const value = e.target.value;
    setAmount(value);
  };

  return (
    <div className="relative mt-1 rounded-md" style={{ height: '62px' }}>
      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
        <span className="text-gray-500 sm:text-sm">$</span>
      </div>
      <input
        type="number"
        step="0.01"
        className={`block w-full h-full pl-7 pr-3 py-3 border ${isAmountValid ? 'text-gray-900' : 'text-red-500'} rounded-lg shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm`}
        placeholder="Enter amount"
        value={amount}
        onChange={handleAmountChange}
      />
    </div>
  );
};

export default AmountInput;
