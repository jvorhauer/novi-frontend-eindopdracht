import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter as Router } from 'react-router-dom';
import '@testing-library/jest-dom';
import { rest } from 'msw';
import { setupServer } from 'msw/node';

import Header from './Header';
import makeUrl from '../../helpers/MakeUrl';

// see https://testing-library.com/docs/react-testing-library/example-intro
// and https://jestjs.io/docs/snapshot-testing
// use https://www.npmjs.com/package/jsonwebtoken ?
const server = setupServer(
  rest.get(makeUrl('/api/users/me'))
)

test('header without user should show signin/up links', () => {
  render(<Router><Header /></Router>);
  expect(screen.getAllByRole('link')).toHaveLength(2);
});

test('header with user should show navigation links', () => {

});