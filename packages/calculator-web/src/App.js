import React from 'react';
import './index.css'; // Ensure this import is present

function App() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r">
      <div className="bg-white p-8 rounded-2xl shadow-2xl w-full max-w-md">
        <h1 className="text-3xl font-extrabold mb-6 text-center text-gray-800">Flex Pay Calculator</h1>
        <form>
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700">Amount</label>
            <input
              type="number"
              className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              placeholder="Enter amount"
            />
          </div>
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700">Term (months)</label>
            <input
              type="number"
              className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              placeholder="Enter term"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-3 px-4 rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Calculate
          </button>
        </form>
      </div>
    </div>
  );
}

export default App;
