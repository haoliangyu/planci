import React, { useState } from 'react';
import Select from 'react-select';
import { calculateMonthlyPayment } from './utils/calculate-payment';
import creditCardOptions from './data/credit-cards.json';
import './index.css'; // Ensure this import is present

const customStyles = {
  control: (provided) => ({
    ...provided,
    padding: '0.75rem',
    borderColor: '#d1d5db',
    borderRadius: '0.5rem',
    boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
    '&:hover': {
      borderColor: '#6366f1',
    },
    '&:focus': {
      borderColor: '#6366f1',
      boxShadow: '0 0 0 3px rgba(99, 102, 241, 0.5)',
    },
  }),
  option: (provided, state) => ({
    ...provided,
    backgroundColor: state.isSelected ? '#6366f1' : state.isFocused ? '#e0f7fa' : null,
    color: state.isSelected ? 'white' : 'black',
    '&:hover': {
      backgroundColor: '#e0f7fa',
    },
  }),
  menu: (provided) => ({
    ...provided,
    borderRadius: '0.5rem',
    boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
  }),
};

function App() {
  const [amount, setAmount] = useState('');
  const [term, setTerm] = useState('');
  const [terms, setTerms] = useState([]);
  const [paymentDetails, setPaymentDetails] = useState(null);
  const [isAmountValid, setIsAmountValid] = useState(true);
  const [isTermValid, setIsTermValid] = useState(true);

  const handleCalculate = (e) => {
    e.preventDefault();
    const details = calculateMonthlyPayment(amount, term);
    setPaymentDetails(details);
  };

  const handleAmountChange = (e) => {
    const value = e.target.value;
    setAmount(value);
    setPaymentDetails(null);
    setIsAmountValid(value === '' || /^\d+(\.\d{1,2})?$/.test(value));
  };

  const handleTermChange = (selectedOption) => {
    setTerm(selectedOption.value);
    setPaymentDetails(null);
    setIsTermValid(selectedOption.value !== '');
  };

  const handleCreditCardChange = (selectedOption) => {
    const selectedCard = creditCardOptions.find(card => card.value === selectedOption.value);
    setTerms(selectedCard.terms.map(term => ({ value: term, label: `${term} months` })));
    setTerm('');
    setPaymentDetails(null);
  };

  const isFormValid = isAmountValid && isTermValid && amount && term;

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-r">
      <h1 className="text-3xl font-extrabold mb-6 text-center text-gray-800">Flex Plan Calculator</h1>
      <div className="bg-white p-8 rounded-2xl shadow-2xl w-full max-w-md">
        <form onSubmit={handleCalculate}>
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700">Credit Card</label>
            <Select
              options={creditCardOptions}
              styles={customStyles}
              className="mt-1 block w-full rounded-lg shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              onChange={handleCreditCardChange}
            />
          </div>
          <div className="mb-6 flex space-x-4">
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700">Amount</label>
              <div className="relative mt-1 rounded-md shadow-sm" style={{ height: '62px' }}>
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
            </div>
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700">Term (months)</label>
              <Select
                options={terms}
                styles={customStyles}
                className="mt-1 block w-full rounded-lg shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                value={terms.find(option => option.value === term)}
                onChange={handleTermChange}
              />
              {!isTermValid && term !== '' && <p className="text-red-500 text-sm mt-1">Please enter a valid term.</p>}
            </div>
          </div>
          <button
            type="submit"
            className={`w-full py-3 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2 ${isFormValid ? 'bg-indigo-600 text-white hover:bg-indigo-700 focus:ring-indigo-500' : 'bg-gray-400 text-gray-700 cursor-not-allowed'}`}
            disabled={!isFormValid}
          >
            Calculate
          </button>
        </form>
        {paymentDetails !== null && (
          <div className="mt-6">
            <h2 className="text-xl font-bold text-center text-gray-800">Payment Details</h2>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Monthly Payment</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-right text-gray-500">${paymentDetails.monthlyPayment}</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Monthly Fee</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-right text-gray-500">${paymentDetails.monthlyFee}</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Total Payment</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-right text-gray-500">${paymentDetails.totalPayment}</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Total Fee</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-right text-gray-500">${paymentDetails.totalFee}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
