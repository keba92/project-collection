import React from 'react';
import { Button } from 'react-bootstrap';
import io from 'socket.io-client';
import { useTranslation } from 'react-i18next';

export default function DeleteButtonCollect(props) {
    const { id } = props;
    const socket = io({transports: ['websocket']});
    const { t, i18n } = useTranslation();

    const deleteCollection = (e) => {
        // eslint-disable-next-line no-restricted-globals
        const answer = confirm(`${t('deleteC')}`);
        if (answer) {
            socket.emit('deleteCollection', {
                _id: id
            })
        }
    }

    return(
        <>
            <Button variant="primary" type="submit" name={id} onClick={deleteCollection}>
                {t('deleteB')}
            </Button>
        </>
    )
}