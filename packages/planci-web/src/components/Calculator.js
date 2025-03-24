import React, { useState, useEffect } from 'react';
import Select from 'react-select';
import { calculateMonthlyPayment } from '../utils/calculate-payment';
import cardProviderOptions from '../data/card-providers.json';
import AmountInput from './AmountInput'; // Import AmountInput component

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

const Calculator = ({ initialAmount, hideAmountInput = false }) => {
  const [amount, setAmount] = useState(initialAmount || '');
  const [term, setTerm] = useState('');
  const [terms, setTerms] = useState([]);
  const [paymentDetails, setPaymentDetails] = useState(null);
  const [isAmountValid, setIsAmountValid] = useState(true);
  const [isTermValid, setIsTermValid] = useState(true);
  const [selectedCard, setSelectedCard] = useState(null);

  useEffect(() => {
    if (isAmountValid && isTermValid && amount && term && selectedCard) {
      const details = calculateMonthlyPayment(amount, term, selectedCard.feeRate);
      setPaymentDetails(details);
    } else {
      setPaymentDetails(null);
    }
  }, [amount, term, isAmountValid, isTermValid, selectedCard]);

  useEffect(() => {
    setAmount(initialAmount || '');
  }, [initialAmount]);

  const handleTermChange = (selectedOption) => {
    if (selectedOption) {
      setTerm(selectedOption.value);
      setIsTermValid(selectedOption.value !== '');
      if (isAmountValid && selectedCard) {
        const details = calculateMonthlyPayment(amount, selectedOption.value, selectedCard.feeRate);
        setPaymentDetails(details);
      }
    } else {
      setTerm('');
      setIsTermValid(false);
      setPaymentDetails(null);
    }
  };

  const handleCreditCardChange = (selectedOption) => {
    if (selectedOption) {
      const selectedCard = cardProviderOptions.find(card => card.value === selectedOption.value);
      setSelectedCard(selectedCard);
      setTerms(selectedCard.terms.map(term => ({ value: term, label: `${term} months` })));
    } else {
      setSelectedCard(null);
      setTerms([]);
      setTerm(''); // Clear the term selection
    }
    if (!initialAmount) {
      setAmount(''); // Clear the amount if not provided as initialAmount
    }
  };

  useEffect(() => {
    if (isAmountValid && isTermValid && amount && term && selectedCard) {
      const details = calculateMonthlyPayment(amount, term, selectedCard.feeRate);
      setPaymentDetails(details);
    } else {
      setPaymentDetails(null);
    }
  }, [term]); // Add term to the dependency array to update plan details when term changes

  return (
    <div className="bg-white p-6 rounded-2xl shadow-xl w-full max-w-md mx-auto">
      <form>
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700">Card Provider</label>
          <Select
            options={cardProviderOptions}
            styles={customStyles}
            className="mt-1 block w-full rounded-lg shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            onChange={handleCreditCardChange}
            isSearchable={true} // Enable search functionality
            isClearable={true} // Enable clear functionality
          />
        </div>
        <div className="mb-6 flex space-x-4">
          {!hideAmountInput && ( // Hide amount input if hideAmountInput is true
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700">Amount</label>
              <AmountInput amount={amount} setAmount={setAmount} isAmountValid={isAmountValid} /> {/* Use AmountInput component */}
            </div>
          )}
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700">Term (months)</label>
            <Select
              options={terms}
              styles={customStyles}
              className="mt-1 block w-full rounded-lg shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              value={terms.find(option => option.value === term)}
              onChange={handleTermChange}
              isClearable={true} // Enable clear functionality
            />
            {!isTermValid && term !== '' && <p className="text-red-500 text-sm mt-1">Please enter a valid term.</p>}
          </div>
        </div>
      </form>
      {paymentDetails !== null && (
        <div className="mt-6">
          <h2 className="text-xl text-gray-800">Plan Details</h2> {/* Remove text-center class */}
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
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
  );
};

export default Calculator;
