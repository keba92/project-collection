import React, { useState, useEffect } from 'react';
import { Card } from 'react-bootstrap';
import {  MarkdownPreview  } from 'react-marked-markdown';
import { Link } from 'react-router-dom';
import io from 'socket.io-client';
import DeleteButtonItem from './DeleteButtonItem';
import { useAuth0 } from '@auth0/auth0-react';
import LikeButton from './LikeButton';
import BoxComment from './BoxComment';

export default function ItemInfo(props) {
    const socket = io();
    const { user, isAuthenticated } = useAuth0();
    const [item, setItem] = useState([])

    useEffect(()=>{
        socket.emit('getItemInfo',{
            _id: props.location.pathname.slice(6)
        })
        socket.on('getItemDataInfo', (data) => setItem(data))
    }, [])
    const makeItem = item.map((el, idx) => {
        const data = JSON.parse(el.dataItem);
        const pole = JSON.parse(el.poleItem);
        return (
            <Card style={{ width: '15rem' }} key={idx}>
                <Card.Body>
                    {Object.keys(data).map((keyName, idx) => {
                        // eslint-disable-next-line default-case
                        switch (pole[keyName]) {
                            case 'number':
                            return <Card.Text key={idx}>{`${keyName}: ${data[keyName]}`}</Card.Text>;
                            case 'text':
                            return <Card.Text key={idx}>{`${keyName}: ${data[keyName]}`}</Card.Text>;
                            case 'textarea':
                            return <MarkdownPreview value={data[keyName]} />;
                            case 'date':
                            return <Card.Text key={idx}>{`${keyName}: ${data[keyName]}`}</Card.Text>;
                            case 'checkbox':
                            return <Card.Text key={idx}>{`${keyName}: ${data[keyName]}`}</Card.Text>;
                        }
                    })}
                </Card.Body>
                {(isAuthenticated)&&(<LikeButton id={props.location.pathname.slice(6)}/>)}
                {(isAuthenticated && user.sub == el.idUser || localStorage.getItem('admin'))&&(
                    <div>
                        <DeleteButtonItem id={props.location.pathname.slice(6)} />
                        <Link to={`/editItem/${props.location.pathname.slice(6)}`}>Редактировать</Link>
                    </div>
                )}
            </Card>
        )
    })

    return (
        (item.length!==0)&&(
            <div>
                <Link className='back' to='/'>На главную страницу</Link>
                <div className='content-item'>
                    {makeItem}
                    {(isAuthenticated)&&(<BoxComment id={props.location.pathname.slice(6)} />)}
                </div>
            </div>
        )
    )
}