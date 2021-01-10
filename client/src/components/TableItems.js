import { useAuth0 } from '@auth0/auth0-react';
import React from 'react';
import { Card } from 'react-bootstrap';
import {  MarkdownPreview  } from 'react-marked-markdown';
import { Link } from 'react-router-dom';
import LikeButton from './LikeButton';


export default function TabelItems(props) {
    const {dataItems, idCollect} = props;
    const { isAuthenticated } = useAuth0();
    const collectItems = dataItems.map((el) => {
        if(el.idCollect == idCollect && idCollect !== '') {
            return el;
        } else {
            return el;
        }
    })
    const makeItems = collectItems.reverse().map((el, idx) => {
        const data = JSON.parse(el.dataItem);
        const pole = JSON.parse(el.poleItem);
        return (
            <Card style={{ width: '15rem' }} key={idx}>
                <Card.Body>
                    {Object.keys(data).map((keyName, idx) => {
                        // eslint-disable-next-line default-case
                        switch (pole[keyName]) {
                            case 'number':
                            return <Card.Text key = {idx}>{`${keyName}: ${data[keyName]}`}</Card.Text>;
                            case 'text':
                            return <Card.Text key = {idx}>{`${keyName}: ${data[keyName]}`}</Card.Text>;
                            case 'textarea':
                            return <MarkdownPreview value={data[keyName]} />;
                            case 'date':
                            return <Card.Text key = {idx}>{`${keyName}: ${data[keyName]}`}</Card.Text>;
                            case 'checkbox':
                            return <Card.Text key = {idx}>{`${keyName}: ${data[keyName]}`}</Card.Text>;
                        }
                    })}
                </Card.Body>
                {(isAuthenticated)&&(<LikeButton id={el._id}/>)}
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