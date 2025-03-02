import React, { useState, useEffect } from 'react';
import Select from 'react-select';
import { calculateMonthlyPayment } from './utils/calculate-payment';
import creditCardOptions from './data/credit-cards.json';
import faqData from './data/faq.json';
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
  const [faqs, setFaqs] = useState([]);

  useEffect(() => {
    if (isAmountValid && isTermValid && amount && term) {
      const details = calculateMonthlyPayment(amount, term);
      setPaymentDetails(details);
    } else {
      setPaymentDetails(null);
    }
  }, [amount, term, isAmountValid, isTermValid]);

  useEffect(() => {
    setFaqs(faqData);
  }, []);

  const handleAmountChange = (e) => {
    const value = e.target.value;
    setAmount(value);
    setIsAmountValid(value === '' || /^\d+(\.\d{1,2})?$/.test(value));
  };

  const handleTermChange = (selectedOption) => {
    setTerm(selectedOption.value);
    setIsTermValid(selectedOption.value !== '');
  };

  const handleCreditCardChange = (selectedOption) => {
    const selectedCard = creditCardOptions.find(card => card.value === selectedOption.value);
    setTerms(selectedCard.terms.map(term => ({ value: term, label: `${term} months` })));
    setTerm('');
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-r overflow-y-auto">
      <header className="w-full bg-white fixed top-0 shadow-xl">
        <div className="container mx-auto px-4 py-4 flex items-center">
          <h1 className="text-xl font-bold">Planci</h1>
        </div>
      </header>
      <div className="container mx-auto px-4 py-8 flex flex-col md:flex-row justify-center space-y-8 md:space-y-0 md:space-x-8 mt-16">
        <div className="flex-1 text-center md:text-left">
          <h1 className="text-4xl font-extrabold mb-4 text-gray-800">Planci</h1>
          <p className="text-lg text-gray-700 mb-2">The universal calculator for pay-over-time plans.</p>
          <p className="text-lg text-gray-700 mb-2">Know your monthly payments ahead of purchase.</p>
          <p className="text-lg text-gray-700">Compare different cards and plans with ease.</p>
        </div>
        <div className="flex-1">
          <div className="bg-white p-6 rounded-2xl shadow-xl w-full max-w-md mx-auto">
            <form>
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
            </form>
            {paymentDetails !== null && (
              <div className="mt-6">
                <h2 className="text-xl text-center text-gray-800">Plan Details</h2>
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
          <div className="mt-4 text-center">
            <a href="#" className="text-black hover:text-black hover:underline font-medium">Compare more cards and plans</a>
          </div>
        </div>
      </div>
      <div className="container mx-auto space-y-8 md:space-y-0 md:space-x-8 px-4">
        <div className="space-y-4">
          <div className="text-2xl font-bold">Frequently Asked Questions</div>
          {faqs.map((faq, index) => (
            <details key={index} className={`py-1 ${index !== faqs.length - 1 ? 'border-b border-gray-300' : ''}`}>
              <summary className="cursor-pointer font-semibold py-1">{faq.question}</summary>
              <p className="mt-2 w-full">{faq.answer}</p>
            </details>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
