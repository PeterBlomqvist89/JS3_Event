import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Header from '../header.jsx'; // Justera sökvägen om nödvändigt
import { signOut } from "firebase/auth";

// Mock Firebase
jest.mock("firebase/auth", () => ({
  signOut: jest.fn(),
  getAuth: jest.fn(() => ({
    currentUser: { uid: '12345' },
  })),
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
  test('renders the header component', () => {
    render(<Header />);
    
    // Kontrollera om alla länkar renderas
    expect(screen.getByText('Event Horizon')).toBeInTheDocument();
    expect(screen.getByText('Event List')).toBeInTheDocument();
    
    // Kontrollera om bild renderas
    expect(screen.getByAltText('logo')).toBeInTheDocument();
    
    // Kontrollera om "Sign out"-knappen renderas
    expect(screen.getByText('Sign out')).toBeInTheDocument();
  });

  test('calls signOut on button click', async () => {
    render(<Header />);
    const button = screen.getByText('Sign out');
    
    fireEvent.click(button);
    
    expect(signOut).toHaveBeenCalled();
  });
});
