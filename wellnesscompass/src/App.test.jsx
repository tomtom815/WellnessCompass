import React from 'react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { cleanup, render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import App from './App';
import { AuthProvider } from './context/AuthProvider';
import axios from './app/api/axios';

// Public-route tests do not need a graphics context or a running medical-data API.
vi.mock('react-plotly.js', () => ({ default: () => null }));
vi.mock('./app/api/axios', () => ({ default: { post: vi.fn(), get: vi.fn() }, axiosPrivate: { get: vi.fn() } }));
afterEach(() => { cleanup(); vi.clearAllMocks(); });

function page(path) {
  return render(<MemoryRouter initialEntries={[path]}><AuthProvider><App /></AuthProvider></MemoryRouter>);
}

describe('public routes with the supported build toolchain', () => {
  it('renders the public homepage without a backend request', () => {
    page('/');
    expect(screen.getByRole('heading', { name: 'Welcome to Wellness Compass' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Sign In' })).toHaveAttribute('href', '/Login');
    expect(axios.get).not.toHaveBeenCalled();
    expect(axios.post).not.toHaveBeenCalled();
  });
  it('renders the existing login fields without sending credentials', () => {
    page('/login');
    expect(screen.getByLabelText('Username:')).toBeInTheDocument();
    expect(screen.getByLabelText('Password:')).toHaveAttribute('type', 'password');
    expect(axios.post).not.toHaveBeenCalled();
  });
  it('renders registration fields without creating a user', () => {
    page('/register');
    expect(screen.getByRole('heading', { name: 'Register' })).toBeInTheDocument();
    expect(screen.getByLabelText(/^Password:/)).toHaveAttribute('type', 'password');
    expect(axios.post).not.toHaveBeenCalled();
  });
});
