import React, { useState, useEffect } from 'react';
import { Card } from 'react-bootstrap';
import Axios from 'axios';
import { useAuth0 } from "@auth0/auth0-react";
import {  MarkdownPreview  } from 'react-marked-markdown';
import { Link } from 'react-router-dom';


export default function TabelItems(props) {
    const [dataItems, setDataItems] = useState([]);
    const { isAuthenticated } = useAuth0();

    useEffect(() => {
        let id;
        (isAuthenticated)? id = props.idCollect : id = 'all';
        Axios.post('/getItems', {
            idCollect: id
        })
        .then((res) => {
            setDataItems(res.data);
        });
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[]);

    const makeItems = dataItems.map((el, idx) => {
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
        <div className='table-items'>
            {makeItems}
        </div>
    )
}