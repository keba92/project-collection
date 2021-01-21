import React, { memo } from 'react';
import { Link } from 'react-router-dom';
import AdminCheckbox from './AdminCheckbox'

function AdminTableRow(props) {
    const {data,adminList, handleChange, checkedItems, idUsers} = props;
    const tableTemplate = data.map((row) => {
        idUsers.push(row.user_id);
         return(
            <tr key={row.user_id}>
                <td><AdminCheckbox checked={checkedItems[row.user_id]}
                    onChange={handleChange} value ={row.user_id}/>
                </td>
                <td><Link to={`/user/${row.user_id}`}>{row.user_id}</Link></td>
                <td>{row.name}</td>
                <td>{row.email}</td>
                <td>{row.created_at}</td>
                <td>{row.last_login}</td>
                <td>{(row.blocked)?('Block'):('OK')}</td>
                <td>{(adminList.includes(row.user_id))?('Admin'):('')}</td>
            </tr>
         );
    });

    return (
        <tbody>
            {tableTemplate}
        </tbody>
    )
}

export default memo(AdminTableRow);