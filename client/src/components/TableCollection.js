import React, {useEffect} from 'react';
import { Card } from 'react-bootstrap';
import {  MarkdownPreview  } from 'react-marked-markdown';
import { Link } from 'react-router-dom';
import DeleteButtonCollect from './DeleteButtonCollect';
import { useAuth0 } from "@auth0/auth0-react";

export default function TableCollection(props) {
    const { dataCollect } = props;
    const { user, isAuthenticated} = useAuth0();


    const makeCollection = dataCollect.map((el, idx) => {
        if(el) {
            return (
                <Card style={{ width: '15rem' }} key={el._id}>
                    <Card.Img variant="top" src={el.url} />
                    <Card.Body key={el._id}>
                        <Card.Title>{el.name}</Card.Title>
                        <Card.Text>{el.collections}</Card.Text>
                        <MarkdownPreview value={el.description} />
                        {(isAuthenticated&&user.sub==el.id)&&(<Link to={`/collection/${el._id}`} > Посмотреть </Link>)}
                        {(isAuthenticated&&user.sub==el.id)&&(<Link to={`/editCollection/${el._id}`} > Редактировать </Link>)}
                        {(isAuthenticated&&user.sub==el.id)&&(<DeleteButtonCollect id={el._id} />)}
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