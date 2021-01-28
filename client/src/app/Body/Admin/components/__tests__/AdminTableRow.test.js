import React from 'react';
import AdminTableRow from '../AdminTableRow';
import { cleanup } from '@testing-library/react';
import renderer from 'react-test-renderer';
import '@testing-library/jest-dom';

afterEach(cleanup);

const testFn = ()=>{
    return 'test';
}

const data = [
    {
        user_id: '1',
        name: 'name1',
        email: 'email1',
        created_at: '01-01-01',
        last_login: '01-01-01',
        blocked: true    
    },
    {
        user_id: '2',
        name: 'name2',
        email: 'email2',
        created_at: '02-02-02',
        last_login: '02-02-02',
        blocked: true    
    }
];

const adminList = ['user1', 'user2'];
const idUsers = [];

it('matches snapshot', () => {
    const tree = renderer.create(<AdminTableRow
        data={data}
        adminList={adminList}
        handleChange={testFn}
        checkedItems={testFn}
        idUsers={idUsers}
      />).toJSON();
    expect(tree).toMatchSnapshot();
})