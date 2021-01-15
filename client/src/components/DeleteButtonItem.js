import React from 'react';
import { Button } from 'react-bootstrap';
import io from 'socket.io-client';
import { useTranslation } from 'react-i18next';

export default function DeleteButtonItem(props) {
    const { id } = props;
    const socket = io(`${window.location.origin}/`,{transports: ['websocket'], rejectUnauthorized: false});
    const { t, i18n } = useTranslation();
    const deleteItem = (e) => {
        // eslint-disable-next-line no-restricted-globals
        const answer = confirm(`${t('deleteC')}`);
        if (answer) {
            socket.emit('deleteItem', {
                _id: id
            })
        }
    }

    return(
        <>
            <Button variant="primary" type="submit" name={id} onClick={deleteItem}>
                {t('deleteB')}
            </Button>
        </>
    )
}