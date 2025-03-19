import React from 'react';
import Header from '../components/Header'; // Import Header component

const Compare = () => {
  return (
    <div>
      <Header />
      <div className="container mx-auto mt-24 px-4">
        <h1 className="text-4xl font-extrabold mb-4 text-gray-800">Compare Plans</h1>
        <p className="text-lg text-gray-700">Compare different payment plans and find the best one for you.</p>
        {/* Add your comparison content here */}
      </div>
    </div>
  );
};

export default Compare;
