import React, { memo, useMemo } from 'react';
import { Link } from 'react-router-dom';
import AdminCheckbox from './AdminCheckbox';
import PropTypes from 'prop-types';

function AdminTableRow(props) {
  const { data, adminList, handleChange, checkedItems, idUsers } = props;
  const tableTemplate = useMemo(
    () =>
      data.map((row) => {
        idUsers.push(row.user_id);
        return (
          <tr key={row.user_id}>
            <td>
              <AdminCheckbox
                checked={checkedItems[row.user_id]}
                onChange={handleChange}
                value={row.user_id}
              />
            </td>
            <td>
              <Link to={`/user/${row.user_id}`}>{row.user_id}</Link>
            </td>
            <td>{row.name}</td>
            <td>{row.email}</td>
            <td>{row.created_at}</td>
            <td>{row.last_login}</td>
            <td>{row.blocked ? 'Block' : 'OK'}</td>
            <td>{adminList.includes(row.user_id) ? 'Admin' : ''}</td>
          </tr>
        );
      }),
    [data, handleChange, checkedItems, idUsers],
  );

  return <tbody>{tableTemplate}</tbody>;
}

AdminTableRow.propTypes = {
  data: PropTypes.array,
  adminList: PropTypes.array,
  handleChange: PropTypes.func,
  checkedItems: PropTypes.object,
  idUsers: PropTypes.array,
};

export default memo(AdminTableRow);
