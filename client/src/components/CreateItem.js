import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import { Form, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';
import TabelItems from './TableItems';

export default function CreateItem(props) {
    const [collection, setCollection] = useState([]);
    const [itemData, setItemData] = useState({});
    const { user } = useAuth0();

    useEffect(()=>{
        Axios.post('/getCollectionInfo',{
            _id: props.location.pathname.slice(12)
        })
        .then((res) => setCollection(res.data))
        .catch((e) => console.log(e))
    },[])

    const addItem = (e) => {
        e.preventDefault();
        Axios.post('/addItem', {
            idUser: user.sub,
            idCollect: props.location.pathname.slice(12),
            dataItem: JSON.stringify(itemData),
            poleItem: collection[0].poleItem
        })
    }

    return (
    <div>
        <Link to={`/user/${user.sub}`}>Вернуться к коллекциям</Link>
        <div className='create'>
            <div className='create-block'>
                <h1 className='create'>Создать Items</h1>
                <Form>
                    {(collection.length != 0)&&(
                        Object.keys(JSON.parse(collection[0].poleItem)).map((keyName, idx) => {
                            if (JSON.parse(collection[0].poleItem)[keyName] != 'textarea' ) {
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
        <TabelItems idCollect={props.location.pathname.slice(12)} />  
    </div>
    )
}