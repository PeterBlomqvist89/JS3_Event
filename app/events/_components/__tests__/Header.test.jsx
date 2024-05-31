import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/';
import Header from '../header';


jest.mock('../../../../firebase/config', () => ({
  db: {}, // Mocka Firestore-databasen
  auth: {}, // Mocka Authentication-tjänsten
  googleProvider: {}, // Mocka GoogleAuthProvider
  storage: {} // Mocka Storage-tjänsten
}));

// Mock Next.js Link
jest.mock('next/link', () => {
  return ({ children, href }) => (
    <a href={href}>{children}</a>
  );
});

// Mock Next.js Image
jest.mock('next/image', () => {
  return ({ src, alt }) => (
    <img src={src} alt={alt} />
  );
});

describe('Header component', () => {
  test('renders "Event Horizon" in the header', () => {
    render(<Header />);
    

    expect(screen.getByText('Event Horizon')).toBeInTheDocument();
  });
});

