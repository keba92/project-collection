import React from 'react';
import { Button } from 'react-bootstrap';
import io from 'socket.io-client';

export default function DeleteButtonItem(props) {
    const { id } = props;
    const socket = io();
    const deleteItem = (e) => {
        // eslint-disable-next-line no-restricted-globals
        const answer = confirm('Вы уверены что хотите удалить?');
        if (answer) {
            socket.emit('deleteItem', {
                _id: id
            })
        }
    }

    return(
        <>
            <Button variant="primary" type="submit" name={id} onClick={deleteItem}>
                Удалить
            </Button>
        </>
    )
}