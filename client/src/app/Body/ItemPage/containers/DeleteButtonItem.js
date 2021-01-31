import React, { useCallback } from 'react';
import { Button } from 'react-bootstrap';
import io from 'socket.io-client';
import { useTranslation } from 'react-i18next';
import PropTypes from 'prop-types';

function DeleteButtonItem(props) {
  const { id } = props;
  const socket = io({
    transports: ['websocket', 'polling'],
    reconnect: true,
  });
  const { t, i18n } = useTranslation();
  const deleteItem = useCallback(() => {
    // eslint-disable-next-line no-restricted-globals
    const answer = confirm(`${t('deleteC')}`);
    if (answer) {
      socket.emit('deleteItem', {
        _id: id,
      });
      window.location.assign(`/`);
    }
  }, [id, t]);

  return (
    <>
      <Button variant="primary" type="submit" name={id} onClick={deleteItem}>
        {t('deleteB')}
      </Button>
    </>
  );
}

DeleteButtonItem.propTypes = {
  id: PropTypes.string,
};

export default DeleteButtonItem;
