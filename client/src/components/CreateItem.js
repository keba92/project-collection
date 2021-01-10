import React, { useState, useEffect } from 'react';
import { Form, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';
import TabelItems from './TableItems';
import io from 'socket.io-client';

export default function CreateItem(props) {
    const socket = io();
    const [collection, setCollection] = useState([]);
    const [itemData, setItemData] = useState({});
    const [dataItems, setDataItems] = useState([]);
    const { user, isAuthenticated } = useAuth0();
    const [id, setId] = useState('');

    useEffect(()=>{
        let idUser;
        socket.emit('getCollectionInfo',{
            _id: props.location.pathname.slice(12)
        })
        socket.on('getCollectionDataInfo', (data) => {
            setCollection(data)
        })
        socket.emit('getItems', {
            idCollect: (isAuthenticated) ? props.location.pathname.slice(12) : 'all'
        })
        socket.on('getDataItems',(data) => {
            setDataItems(data);
        })
        if(localStorage.getItem('admin')) {
            idUser = localStorage.getItem('admin');
        } else {
            idUser = user.sub
        }
        setId(idUser)
    },[])

    const addItem = (e) => {
        e.preventDefault();
        socket.emit('addItem', {
            idUser: id,
            idCollect: props.location.pathname.slice(12),
            dataItem: JSON.stringify(itemData),
            poleItem: collection[0].poleItem
        })
        socket.on('getDataItems',(data) => {
            setDataItems(data);
        },[])
    }

    return (
    <div>
        <Link className='back' to={`/user/${id}`}>Вернуться к коллекциям</Link>
        <div className='create'>
            <div className='create-block'>
                <h1 className='create'>Создать Items</h1>
                <Form>
                    {(collection.length != 0)&&(
                        Object.keys(JSON.parse(collection[0].poleItem)).map((keyName, idx) => {
                            if (JSON.parse(collection[0].poleItem)[keyName] == 'checkbox' ) {
                                return(
                                    <Form.Check type="checkbox" id="autoSizingCheck2" label={keyName} />
                                )
                            } else if(JSON.parse(collection[0].poleItem)[keyName] == 'textarea') {
                                return (
                                <Form.Group key={idx} controlId={`ControlInput${idx}`}>
                                       <Form.Label>Введите {`${keyName}`}: </Form.Label>
                                       <Form.Control as={`${JSON.parse(collection[0].poleItem)[keyName]}`} rows={3} title={keyName} onChange={(e)=>{
                                           itemData[e.target.title] = e.target.value;
                                           setItemData(itemData);
                                       }} />
                                </Form.Group>
                                )
                            } else {
                                return (
                                    <Form.Group key={idx} controlId={`ControlInput${idx}`}>
                                        <Form.Label>Введите {`${keyName}`}: </Form.Label>
                                        <Form.Control type={`${JSON.parse(collection[0].poleItem)[keyName]}`} title={keyName} onChange={(e)=>{
                                            itemData[e.target.title] = e.target.value;
                                            setItemData(itemData);
                                        }} />
                                    </Form.Group>
                                 )
                            }
                        })
                    )}
                    <Button variant="primary" type="submit" onClick={addItem}>
                        Создать
                    </Button>
                </Form>
            </div>
        </div>
        <TabelItems dataItems={dataItems} idCollect={props.location.pathname.slice(12)} />  
    </div>
    )
}