import React from 'react';
import { Card } from 'react-bootstrap';
import {  MarkdownPreview  } from 'react-marked-markdown';
import { Link } from 'react-router-dom';
import DeleteButtonCollect from './DeleteButtonCollect';

export default function TableCollection(props) {
    const { dataCollect } = props;

    const makeCollection = dataCollect.reverse().map((el, idx) => {
        return (
            <Card style={{ width: '15rem' }} key={idx}>
                <Card.Img variant="top" src={el.url} />
                <Card.Body>
                    <Card.Title>{el.name}</Card.Title>
                    <Card.Text>{el.collections}</Card.Text>
                    <MarkdownPreview value={el.description} />
                    <Link to={`/collection/${el._id}`}> Посмотреть </Link>
                    <Link to={`/editCollection/${el._id}`}> Редактировать </Link>
                    <DeleteButtonCollect id={el._id} />
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