import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import { Card, Button } from 'react-bootstrap';
import {  MarkdownPreview  } from 'react-marked-markdown';
import { Link } from 'react-router-dom';

export default function ItemInfo(props) {
    const [item, setItem] = useState([])

    useEffect(()=>{
        Axios.post('/getItemInfo',{
            _id: props.location.pathname.slice(6)
        })
        .then((res) => setItem(res.data))
        .catch((e) => console.log(e))
    }, [])

    return (
        (item.length!==0)&&(
            <div>
                <Link to='/'>На главную страницу</Link>
                <Card style={{ width: '30rem' }}>
                    <Card.Img variant="top" src={item[0].url} />
                    <Card.Body>
                        <Card.Title>{item[0].name}</Card.Title>
                        <Card.Text>{item[0].collections}</Card.Text>
                        <MarkdownPreview value={item[0].description} />
                    </Card.Body>
                </Card>
            </div>
        )
    )
}