import React, { useState, useEffect } from 'react';
import { Card, Button } from 'react-bootstrap';
import Axios from 'axios';
import { useAuth0 } from "@auth0/auth0-react";
import {  MarkdownPreview  } from 'react-marked-markdown';


export default function TabelItems() {
    const [dataItems, setDataItems] = useState([]);
    const { user } = useAuth0();

    useEffect(() => {
        Axios.post('/getItems', {
            id: user.sub
        })
        .then((res) => {
            setDataItems(res.data);
        });
    },[]);

    const makeItems = dataItems.map((el, idx) => {
        return (
            <Card style={{ width: '18rem' }} key={idx}>
                <Card.Img variant="top" src={el.url} />
                <Card.Body>
                    <Card.Title>{el.name}</Card.Title>
                    <Card.Text>{el.collections}</Card.Text>
                    <MarkdownPreview value={el.description} />
                    <Button variant="primary">Посмотреть</Button>
                </Card.Body>
            </Card>
        )
    })

    return (
        <div className='table-items'>
            {makeItems}
        </div>
    )
}