import React from 'react';
import AdminTableHead from '../AdminTableHead';
import { cleanup } from '@testing-library/react';
import renderer from 'react-test-renderer';
import '@testing-library/jest-dom';

afterEach(cleanup);

const testFn = () => {
  return 'test';
};

it('matches snapshot', () => {
  const tree = renderer.create(<AdminTableHead selectAll={testFn} checkedAll={testFn} />).toJSON();
  expect(tree).toMatchSnapshot();
});
