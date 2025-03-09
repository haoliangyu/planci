import { render, screen } from '@testing-library/react';
import App from './App';

test('renders calculator', () => {
  render(<App />); // Render the App component
  const linkElement = screen.getByText(/Clear/i); // Find the Clear button
  expect(linkElement).toBeInTheDocument(); // Assert that the Clear button is in the document
});
