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
                            return <Card.Text>{data[keyName]}</Card.Text>;
                            case 'text':
                            return <Card.Text>{data[keyName]}</Card.Text>;
                            case 'textarea':
                            return <MarkdownPreview value={data[keyName]} />;
                            case 'date':
                            return <Card.Text>{data[keyName]}</Card.Text>;
                            case 'checkbox':
                            return <Card.Text>{data[keyName]}</Card.Text>;
                        }
                    })}
                </Card.Body>
                <Link to={`/item/${el._id}`}> Посмотреть </Link>
            </Card>
        )
    })

    return (
        (item.length!==0)&&(
            <div>
                <Link to='/'>На главную страницу</Link>
                {makeItem}
            </div>
        )
    )
}