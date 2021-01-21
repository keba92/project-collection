import React, { useCallback } from 'react';
import { Button } from 'react-bootstrap';
import io from 'socket.io-client';
import { useTranslation } from 'react-i18next';

export default function DeleteButtonCollect(props) {
    const { id } = props;
    const socket = io({ transports: [ 'websocket', 'polling' ], reconnect: true });
    const { t, i18n } = useTranslation();

    const deleteCollection = useCallback((e) => {
        // eslint-disable-next-line no-restricted-globals
        const answer = confirm(`${t('deleteC')}`);
        if (answer) {
            socket.emit('deleteCollection', {
                _id: id
            })
            window.location.assign(`/`)
        }
    }, [id, t])

    return(
        <>
            <Button variant="primary" type="submit" name={id} onClick={deleteCollection}>
                {t('deleteB')}
            </Button>
        </>
    )
}