import React, { memo } from 'react';
import { Form } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';

function FormInput(props) {
  const { idContrl, lable, type, placeholder, setFunc, value, data } = props;
  const { t, i18n } = useTranslation();

  return (
    <Form.Group controlId={`${idContrl}`}>
      <Form.Label>{t(`${lable}`)}</Form.Label>
      {type == 'text' ? (
        <Form.Control
          type={type}
          onChange={(e) => setFunc(e.target.value)}
          placeholder={t(`${placeholder}`)}
          value={value}
        />
      ) : (
        <Form.Control
          as={type}
          rows={3}
          onChange={(e) => setFunc(e.target.value)}
          placeholder={t(`${placeholder}`)}
          value={value && value}
        >
          {data && data}
        </Form.Control>
      )}
    </Form.Group>
  );
}

export default memo(FormInput);
