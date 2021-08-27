import React from 'react';
import { render, screen } from '@testing-library/react';
import { Link, MemoryRouter as Router } from 'react-router-dom';
import '@testing-library/jest-dom';

import NotSignedIn from './NotSignedIn';

test('should show "not signed in" card', () => {
  const wrapper = render(<Router><NotSignedIn /></Router>);
  expect(wrapper).toBeTruthy();
  expect(screen.getByRole('heading')).toHaveTextContent('U bent niet aangemeld!');
})