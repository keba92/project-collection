import React from 'react';
import { Button } from 'react-bootstrap';
import io from 'socket.io-client';

export default function DeleteButtonCollect(props) {
    const { id } = props;
    const socket = io("http://localhost:3001/");
    const deleteCollection = (e) => {
        // eslint-disable-next-line no-restricted-globals
        const answer = confirm('Вы уверены что хотите удалить?');
        if (answer) {
            socket.emit('deleteCollection', {
                _id: id
            })
        }
    }

    return(
        <>
            <Button variant="primary" type="submit" name={id} onClick={deleteCollection}>
                Удалить
            </Button>
        </>
    )
}