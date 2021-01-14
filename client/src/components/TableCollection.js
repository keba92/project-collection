import React from 'react';
import { Card } from 'react-bootstrap';
import {  MarkdownPreview  } from 'react-marked-markdown';
import { Link } from 'react-router-dom';
import DeleteButtonCollect from './DeleteButtonCollect';
import { useAuth0 } from "@auth0/auth0-react";
import { useTranslation } from 'react-i18next';

export default function TableCollection(props) {
    const { dataCollect } = props;
    const { user, isAuthenticated} = useAuth0();
    const { t, i18n } = useTranslation();
    let id = null;

    
    const makeCollection = dataCollect.map((el, idx) => {
        if(isAuthenticated){
            if(JSON.parse(localStorage.getItem('arrAdmins')).includes(user.sub)) {
                id = user.sub;
            } else if (user.sub==el.id) {
                id = user.sub;
            }
        }
        if(el) {
            return (
                <Card style={{ width: '15rem' }} key={el._id}>
                    <Card.Img variant="top" src={el.url} />
                    <Card.Body key={el._id}>
                        <Card.Title>{el.name}</Card.Title>
                        <Card.Text>{el.collections}</Card.Text>
                        <MarkdownPreview value={el.description} />
                        {(isAuthenticated&&id)&&(<Link to={`/collection/${el._id}`} > {t('openL')} </Link>)}
                        {(isAuthenticated&&id)&&(<Link to={`/editCollection/${el._id}`} > {t('editL')} </Link>)}
                        {(isAuthenticated&&id)&&(<DeleteButtonCollect id={el._id} />)}
                    </Card.Body>
                </Card>
            )
        }
    })

    return (
        <div className='table-collection'>
            {makeCollection}
        </div>
    )
}