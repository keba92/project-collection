import React, { useState, useEffect } from 'react';
import { Card } from 'react-bootstrap';
import Axios from 'axios';
import { useAuth0 } from "@auth0/auth0-react";
import {  MarkdownPreview  } from 'react-marked-markdown';
import { Link } from 'react-router-dom';

export default function TableCollection() {
    const [dataCollection, setDataCollection] = useState([]);
    const { user, isAuthenticated } = useAuth0();

    useEffect(() => {
        let id;
        (isAuthenticated)? id = user.sub : id = 'all';
        Axios.post('/getCollection', {
            id: id
        })
        .then((res) => {
            setDataCollection(res.data);
        });
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[]);

    const makeCollection = dataCollection.map((el, idx) => {
        return (
            <Card style={{ width: '15rem' }} key={idx}>
                <Card.Img variant="top" src={el.url} />
                <Card.Body>
                    <Card.Title>{el.name}</Card.Title>
                    <Card.Text>{el.collections}</Card.Text>
                    <MarkdownPreview value={el.description} />
                    <Link to={`/collection/${el._id}`}> Посмотреть </Link>
                </Card.Body>
            </Card>
        )
    })

    return (
        <div className='table-collection'>
            {makeCollection}
        </div>
    )
}