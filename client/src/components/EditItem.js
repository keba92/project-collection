import React, { useState, useEffect } from 'react';
import { Form, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import io from 'socket.io-client';

export default function EditItem(props) {
    const id = props.location.pathname.slice(10);
    const socket = io();
    const [itemData, setItemData] = useState([]);
    const [newItemData, setNewItemData] = useState({})

    useEffect(() => {
        socket.emit('getItemInfo', {
            _id: id
        })
        socket.on('getItemDataInfo',(data) => {
            setItemData(data);
        })
    },[])

    const editItem = (e) => {
        e.preventDefault();
        socket.emit('editItem', {
            _id: id,
            dataItem: JSON.stringify(newItemData)
        })
    }

    return(
        <div>
          <Link className='back' to={`/item/${id}`}>Вернуться к Item</Link>
          <Form>
            {(itemData.length != 0)&&(
                Object.keys(JSON.parse(itemData[0].poleItem)).map((keyName, idx) => {
                    const data = JSON.parse(itemData[0].dataItem)
                    if (JSON.parse(itemData[0].poleItem)[keyName] == 'checkbox' ) {
                        return (
                            <Form.Check type="checkbox" id="autoSizingCheck2" label={keyName} />
                        )
                    } else if(JSON.parse(itemData[0].poleItem)[keyName] == 'textarea') {
                        return (
                            <Form.Group key={idx} controlId={`ControlInput${idx}`}>
                                <Form.Label>Введите {`${keyName}`}: </Form.Label>
                                <Form.Control as={`${JSON.parse(itemData[0].poleItem)[keyName]}`} rows={3} title={keyName} onChange={(e)=>{
                                    newItemData[e.target.title] = e.target.value;
                                    setNewItemData(newItemData);
                                }} placeholder={data[keyName]} />
                            </Form.Group>
                        )
                    } else {
                        return (
                            <Form.Group key={idx} controlId={`ControlInput${idx}`}>
                                <Form.Label>Введите {`${keyName}`}: </Form.Label>
                                <Form.Control type={`${JSON.parse(itemData[0].poleItem)[keyName]}`} title={keyName} onChange={(e)=>{
                                    newItemData[e.target.title] = e.target.value;
                                    setNewItemData(newItemData);
                                }} placeholder={data[keyName]} />
                            </Form.Group>
                        )
                    }
                })
            )}
            <Button variant="primary" type="submit" onClick={editItem}>
                Сохранить
            </Button>
          </Form>
        </div>
    )
}