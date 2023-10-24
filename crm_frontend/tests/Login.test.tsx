import React from 'react';
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';

import { Login } from '../src/pages/Login';

describe('Login component', () => {
  it('Login to be in login page', () => {
    render(<Login />);
    expect(screen.getByText('Sign in to your account')).toBeInTheDocument();
  });
});
