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
import Calculator from './components/Calculator'; // Import Calculator component

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
              <meta name="description" content="Planci is an easy-to-use tool that lets you estimate your monthly payments and fees for flexible payment plans on your credit cards." /> {/* Ensure meta description is present */}
              <meta name="keywords" content="payment plan, credit card, monthly payments, fees, calculator" />
              <meta name="author" content="Planci Team" />
              <meta property="og:title" content="Planci - Flexible Payment Plan Calculator" />
              <meta property="og:description" content="Planci is an easy-to-use tool that lets you estimate your monthly payments and fees for flexible payment plans on your credit cards." />
              <meta property="og:type" content="website" />
              <meta property="og:url" content="https://www.planci.com" />
              <meta property="og:image" content="https://www.planci.com/logo.png" />
              <meta name="twitter:card" content="summary_large_image" />
              <meta name="twitter:title" content="Planci - Flexible Payment Plan Calculator" />
              <meta name="twitter:description" content="Planci is an easy-to-use tool that lets you estimate your monthly payments and fees for flexible payment plans on your credit cards." />
              <meta name="twitter:image" content="https://www.planci.com/logo.png" />
              <meta name="robots" content="index, follow" /> {/* For Google */}
              <meta name="googlebot" content="index, follow" /> {/* For Google */}
              <meta name="bingbot" content="index, follow" /> {/* For Bing */}
              <meta name="yahoobot" content="index, follow" /> {/* For Yahoo */}
              <meta name="duckduckgobot" content="index, follow" /> {/* For DuckDuckGo */}
              <meta name="baiduspider" content="index, follow" /> {/* For Baidu */}
              <script type="application/ld+json">
                {`
                  {
                    "@context": "https://schema.org",
                    "@type": "WebSite",
                    "name": "Planci",
                    "url": "https://www.planci.com",
                    "description": "Planci is an easy-to-use tool that lets you estimate your monthly payments and fees for flexible payment plans on your credit cards.",
                    "publisher": {
                      "@type": "Organization",
                      "name": "Planci Team"
                    }
                  }
                `}
              </script>
            </Helmet>
            <Header /> {/* Add Header component */}
            <div className="container mx-auto px-4 py-8 flex flex-col space-y-8">
              <div className="text-center">
                <h1 className="text-4xl font-extrabold mb-4 text-gray-800">Planci</h1>
                <p className="text-lg text-gray-700 mb-2">Easily compare pay-over-time plans and know your monthly payments before you buy.</p>
              </div>
              <Calculator /> {/* Use Calculator component */}
              <div className="mt-4 text-center">
                <a href="/compare" className="text-black hover:text-black hover:underline font-medium">Compare more cards and plans</a>
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
