import { render, screen } from '@testing-library/react';
import App from './App.jsx';

test('renders the rail identity on the home route', () => {
  render(<App />);
  expect(screen.getByText(/Felipe/)).toBeInTheDocument();
});
