import React, { useState, useEffect } from 'react';
import { Card } from 'react-bootstrap';
import {  MarkdownPreview  } from 'react-marked-markdown';
import { Link } from 'react-router-dom';
import io from 'socket.io-client';
import DeleteButtonItem from './DeleteButtonItem';
import { useAuth0 } from '@auth0/auth0-react';
import LikeButton from './LikeButton';
import BoxComment from './BoxComment';
import Tag from '@uiw/react-tag';
import { useTranslation } from 'react-i18next';

export default function ItemInfo(props) {
    const socket = io(`${window.location.origin}/`,{transports: ['websocket']});
    const { user, isAuthenticated } = useAuth0();
    const [item, setItem] = useState([]);
    const { t, i18n } = useTranslation();

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
                            return <Card.Text key = {idx}>{`${data['name']}: ${(data[keyName])?('Да'):('Нет')}`}</Card.Text>;
                        }
                    })}
                    {el.tag.map((teg,indx)=>{
                        return (
                            <Tag key={`${indx}`} light disabled color="#28a745">{teg}</Tag>
                        )
                    })}
                </Card.Body>
                {(isAuthenticated)&&(<LikeButton id={props.location.pathname.slice(6)}/>)}
                {(isAuthenticated && user.sub == el.idUser || localStorage.getItem('admin'))&&(
                    <div>
                        <DeleteButtonItem id={props.location.pathname.slice(6)} />
                        <Link to={`/editItem/${props.location.pathname.slice(6)}`}>{t('editL')}</Link>
                    </div>
                )}
            </Card>
        )
    })

    return (
        (item.length!==0)&&(
            <div>
                <Link className='back' to='/'>{t('backMainL')}</Link>
                <div className='content-item'>
                    {makeItem}
                    {(isAuthenticated)&&(<BoxComment id={props.location.pathname.slice(6)} />)}
                </div>
            </div>
        )
    )
}