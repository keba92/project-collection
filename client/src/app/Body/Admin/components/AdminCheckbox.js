import React, { memo } from 'react';

const AdminCheckbox = (props) => {
  const { type = 'checkbox', checked = false, onChange, title, value } = props;
  return (
    <input
      type={type}
      className="form-check-input"
      checked={checked}
      onChange={onChange}
      title={title}
      value={value}
    />
  );
};

export default memo(AdminCheckbox);
