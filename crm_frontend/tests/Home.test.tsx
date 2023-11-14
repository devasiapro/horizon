import React from 'react';
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';

import { Home } from '../src/pages/Home';

describe('Home component', () => {
  it('Home to be in document', () => {
    render(<Home />);
    expect(screen.getByText('Home')).toBeInTheDocument();
  });
});
