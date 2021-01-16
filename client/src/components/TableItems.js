import { useAuth0 } from '@auth0/auth0-react';
import React from 'react';
import { Card } from 'react-bootstrap';
import {  MarkdownPreview  } from 'react-marked-markdown';
import { Link } from 'react-router-dom';
import LikeButton from './LikeButton';
import Tag from '@uiw/react-tag';
import { useTranslation } from 'react-i18next';


export default function TabelItems(props) {
    const {dataItems, idCollect} = props;
    const { isAuthenticated } = useAuth0();
    const { t, i18n } = useTranslation();
    const collectItems = [];

    if(idCollect == ''){
        dataItems.forEach((el) => collectItems.push(el))
    } else {
        dataItems.forEach((el) => {
            if(el.idCollect == idCollect) {
                collectItems.push(el);
            }
        })
    }
    const makeItems = () => {
        if(collectItems.length!=0){
            return collectItems.reverse().map((el, idx) => {
                const data = JSON.parse(el.dataItem);
                const pole = JSON.parse(el.poleItem);
                return (
                    <Card style={{ width: '15rem' }} className='item' key={idx}>
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
                                    return <Card.Text key = {idx}>{`${keyName}: ${(data[keyName])?('Да'):('Нет')}`}</Card.Text>;
                                }
                            })}
                            {el.tag.map((teg,indx)=>{
                                return (
                                    <Tag key={`${indx}`} light disabled color="#28a745">{teg}</Tag>
                                )
                            })}
                        </Card.Body>
                        {(isAuthenticated)&&(<LikeButton id={el._id}/>)}
                        <Link to={`/item/${el._id}`}> {t('openL')} </Link>
                    </Card>
                )
            })
        }
    }
    

    return (
        <div className='table-items'>
            {makeItems()}
        </div>
    )
}