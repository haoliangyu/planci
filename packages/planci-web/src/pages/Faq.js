import React, { useEffect, useState } from 'react';
import faqData from '../data/faq.json';

const Faq = () => {
  const [faqs, setFaqs] = useState([]);

  useEffect(() => {
    setFaqs(faqData);
  }, []);

  return (
    <div className="faq-container mx-auto space-y-8 md:space-y-0 md:space-x-8 px-4 mt-24 w-full sm:w-430 md:w-768 lg:w-875">
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
  );
};

export default Faq;
