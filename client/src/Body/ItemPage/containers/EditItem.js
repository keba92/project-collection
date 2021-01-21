import React, { useState, useEffect, useCallback } from 'react';
import { Form, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import io from 'socket.io-client';
import { useTranslation } from 'react-i18next';

export default function EditItem(props) {
    const id = props.location.pathname.slice(10);
    const socket = io({ transports: [ 'websocket', 'polling' ], reconnect: true });
    const [itemData, setItemData] = useState([]);
    const [newItemData, setNewItemData] = useState({});
    const { t, i18n } = useTranslation();

    useEffect(() => {
        socket.emit('getItemInfo', {
            _id: id
        })
        socket.on('getItemDataInfo',(data) => {
            setItemData(data);
        })
    },[])

    const editItem = useCallback((e) => {
        e.preventDefault();
        socket.emit('editItem', {
            _id: id,
            dataItem: JSON.stringify(newItemData)
        })
        window.location.assign(`/item/${id}`)
    }, [newItemData, id])

    return(
        <div className='edit-item'>
          <div className='button-main'>
            <Link className='back'  to={`/item/${id}`}>{t('backItemL')}</Link>
          </div>
          <div className='create'>
          <Form>
            {(itemData.length != 0)&&(
                Object.keys(JSON.parse(itemData[0].poleItem)).map((keyName, idx) => {
                    const data = JSON.parse(itemData[0].dataItem)
                    if (JSON.parse(itemData[0].poleItem)[keyName] == 'checkbox' && keyName != 'tag') {
                        return (
                            <Form.Check type="checkbox" id="autoSizingCheck2" name={keyName} onChange={(e) =>{
                                newItemData[e.target.name] = e.target.checked
                                setNewItemData(newItemData)
                            }}/>
                        )
                    } else if(JSON.parse(itemData[0].poleItem)[keyName] == 'textarea'&& keyName != 'tag') {
                        return (
                            <Form.Group key={idx} controlId={`ControlInput${idx}`}>
                                <Form.Label>{t('enterC')} {`${keyName}`}: </Form.Label>
                                <Form.Control as={`${JSON.parse(itemData[0].poleItem)[keyName]}`} rows={3} title={keyName} onChange={(e)=>{
                                    newItemData[e.target.title] = e.target.value;
                                    setNewItemData(newItemData);
                                }} >{data[keyName]}</Form.Control>
                            </Form.Group>
                        )
                    } else if (keyName != 'tag') {
                        return (
                            <Form.Group key={idx} controlId={`ControlInput${idx}`}>
                                <Form.Label>{t('enterC')} {`${keyName}`}: </Form.Label>
                                <Form.Control type={`${JSON.parse(itemData[0].poleItem)[keyName]}`} title={keyName} onChange={(e)=>{
                                    newItemData[e.target.title] = e.target.value;
                                    setNewItemData(newItemData);
                                }} placeholder={data[keyName]}/>
                            </Form.Group>
                        )
                    }
                })
            )}
            <Button variant="primary" type="submit" onClick={editItem}>
                {t('saveB')}
            </Button>
          </Form>
          </div>
          <div style={{height:'500px'}}>
          </div>
        </div>
    )
}