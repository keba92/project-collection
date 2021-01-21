import { useAuth0 } from '@auth0/auth0-react';
import React, { useCallback } from 'react';
import { Card } from 'react-bootstrap';
import {  MarkdownPreview  } from 'react-marked-markdown';
import { Link } from 'react-router-dom';
import LikeButton from '../../ItemPage/containers/LikeButton';
import Tag from '@uiw/react-tag';
import { useTranslation } from 'react-i18next';

function TabelItems(props) {
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
    const makeItems = useCallback(() => {
        if(collectItems.length!=0){
            return collectItems.reverse().map((el, idx) => {
                const data = JSON.parse(el.dataItem);
                const pole = JSON.parse(el.poleItem);
                return (
                    <Card style={{ width: '20rem' }} className='item' key={idx}>
                        <Card.Body>
                            {Object.keys(data).map((keyName, idx) => {
                                if(keyName == 'name') {
                                 return <Card.Title>{data[keyName]}</Card.Title>
                                }
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
                                    <Tag key={`${indx}`} light disabled color="rgb(41, 178, 128)">{teg}</Tag>
                                )
                            })}
                        </Card.Body>
                        {(isAuthenticated)&&(<LikeButton id={el._id}/>)}
                        <Link to={`/item/${el._id}`}> {t('openL')} </Link>
                    </Card>
                )
            })
        }
    }, [dataItems, idCollect, collectItems, isAuthenticated, t])

    return (
        <div className='table-items'>
            {makeItems()}
        </div>
    )
}

export default TabelItems;