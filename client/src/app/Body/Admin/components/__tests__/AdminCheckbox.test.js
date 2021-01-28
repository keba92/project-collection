import React from 'react';
import AdminCheckbox from '../AdminCheckbox';
import { cleanup } from '@testing-library/react';
import renderer from 'react-test-renderer';
import '@testing-library/jest-dom';

afterEach(cleanup);

const testFn = ()=>{
    return 'test';
}

it('matches snapshot', () => {
    const tree = renderer.create(<AdminCheckbox
                                    checked='user'
                                    onChange={testFn}
                                    value='user_id'
                                />).toJSON();
    expect(tree).toMatchSnapshot();
})