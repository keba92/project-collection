import React, { memo } from 'react';
import { Form } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import PropTypes from 'prop-types';

function FormOption(props) {
  const { idContrl, lable, setFunc, dataOption } = props;
  const { t, i18n } = useTranslation();

  const createOption = Object.keys(dataOption).map((keyName) => {
    return <option value={keyName}>{dataOption[keyName]}</option>;
  });

  return (
    <Form.Group controlId={`${idContrl}`}>
      <Form.Label>{t(`${lable}`)}</Form.Label>
      <Form.Control as="select" onInput={(e) => setFunc(e.target.value)}>
        <option></option>
        {createOption}
      </Form.Control>
    </Form.Group>
  );
}

FormOption.propTypes = {
  idContrl: PropTypes.number,
  label: PropTypes.string,
  setFunc: PropTypes.func,
  dataOption: PropTypes.object,
};

export default memo(FormOption);
