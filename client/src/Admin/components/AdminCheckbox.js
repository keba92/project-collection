import React from 'react';

const AdminCheckbox = ({ type = "checkbox", checked = false, onChange, title, value }) => {
    return (
      <input type={type} className ='form-check-input' checked={checked} onChange={onChange} title ={title} value={value} />
    );
};

export default AdminCheckbox;