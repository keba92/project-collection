import React from 'react';
import AdminButtons from '../AdminButtons';
import { cleanup } from '@testing-library/react';
import renderer from 'react-test-renderer';
import '@testing-library/jest-dom';

afterEach(cleanup);

const testFn = ()=>{
    return 'test';
}

it('matches snapshot', () => {
    const tree = renderer.create(<AdminButtons blockUser={testFn} deleteUsers={testFn} makeAdmin={testFn} />).toJSON();
    expect(tree).toMatchSnapshot();
})
