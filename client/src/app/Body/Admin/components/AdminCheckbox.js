import React, { memo } from 'react';
import PropTypes from 'prop-types';

function AdminCheckbox(props) {
  const { type, checked, onChange, title, value } = props;
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
}

AdminCheckbox.defaultProps = {
  type: 'checkbox',
  checked: false,
};

AdminCheckbox.propTypes = {
  type: PropTypes.string,
  checked: PropTypes.bool,
  onChange: PropTypes.func,
  title: PropTypes.string,
  value: PropTypes.string,
};

export default memo(AdminCheckbox);
