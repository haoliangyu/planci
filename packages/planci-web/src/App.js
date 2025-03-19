import React, { useState, useEffect } from 'react';
import Select from 'react-select';
import { calculateMonthlyPayment } from './utils/calculate-payment';
import cardProviderOptions from './data/card-providers.json';
import faqData from './data/faq.json';
import './index.css'; // Ensure this import is present
import { Helmet } from 'react-helmet'; // Import Helmet
import Header from './components/Header'; // Import Header component
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; // Import Router components
import Faq from './pages/Faq'; // Import Faq page
import Compare from './pages/Compare'; // Import Compare page

import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/react";

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
    setFaqs(faqData);
  }, []);

  const handleAmountChange = (e) => {
    const value = e.target.value;
    setAmount(value);
    setIsAmountValid(value === '' || /^\d+(\.\d{1,2})?$/.test(value));
  };

  const handleTermChange = (selectedOption) => {
    if (selectedOption) {
      setTerm(selectedOption.value);
      setIsTermValid(selectedOption.value !== '');
    } else {
      setTerm('');
      setIsTermValid(false);
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
    setAmount(''); // Clear the amount
  };

  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/faq" element={<Faq />} />
        <Route path="/compare" element={<Compare />} /> {/* Add Compare route */}
        <Route path="/" element={
          <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-r overflow-y-auto max-w-4xl mx-auto mt-20">
            <Helmet>
              <title>Planci - Flexible Payment Plan Calculator</title>
              <meta name="description" content="Planci is an easy-to-use tool that lets you estimate your monthly payments and fees for flexible payment plans on your credit cards." />
              <meta name="keywords" content="payment plan, credit card, monthly payments, fees, calculator" />
            </Helmet>
            <Header /> {/* Add Header component */}
            <div className="container mx-auto px-4 py-8 flex flex-col md:flex-row justify-center space-y-8 md:space-y-0 md:space-x-8">
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
                          isClearable={true} // Enable clear functionality
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
                  <a href="/compare" className="text-black hover:text-black hover:underline font-medium">Compare more cards and plans</a>
                </div>
              </div>
            </div>
            <Analytics/>
            <SpeedInsights/>
          </div>
        } />
      </Routes>
    </Router>
  );
}

export default App;
