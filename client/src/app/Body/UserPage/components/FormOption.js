import React, { memo } from 'react';
import { Form } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';

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

export default memo(FormOption);
