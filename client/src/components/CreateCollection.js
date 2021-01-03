import React, { useEffect, useState } from 'react';
import Axios from 'axios';
import { useAuth0 } from "@auth0/auth0-react";
import { Form, Button } from 'react-bootstrap';
import TabelItems from './TableItems';

export default function CreateCollection() {
    const [collection, setCollection] = useState('');
    const [collections, setCollections] = useState([]);
    const [nameItem, setNameItem] = useState('');
    const [shortNameItem, setShortNameItem] = useState('');
    const [urlPicture, setUrlPicture] = useState('');
    const [collectionItem, setCollectionItem] = useState('');
    const [optionItem, setOptionItem] = useState('');
    const { user } = useAuth0();

    useEffect(() =>{
        Axios.get('/getCollection')
        .then((res) => {
            setCollections(res.data);
        });
    },[])

    const createCollection = ()=>{
        Axios.post('/addCollection', {
            id: localStorage.getItem('id'),
            collect: collection
        })
    }

    const createOptions = collections.map((el,idx) => {
        return (
            <option key={idx} value={el.collections}>{el.collections}</option>
        )
    })
    

    const createItem = (e) =>{
        e.preventDefault();
        Axios.post('/addItem',{
            id: localStorage.getItem('id'),
            collect: collectionItem,
            name: nameItem,
            description: shortNameItem,
            teg: optionItem,
            url: urlPicture
        })
    }

    return(
        <div className='create-block'>
            <h1 className='create'>Создать коллекцию</h1>
            <div className='create-collection create'>
                <Form inline>
                    <Form.Label>Название коллекции: </Form.Label>
                    <Form.Control type="text"  
                                placeholder='Введите название коллекции' 
                                onChange={(e)=>setCollection(e.target.value)} 
                                className=" mr-sm-2" 
                    />
                    <Button variant="primary" type="submit"onClick={createCollection}>
                        Создать коллекцию
                    </Button>
                </Form>
            </div>
            <h1 className='create'>Создать элемент коллекции</h1>
            <div className='create-item create'>
            <Form>
                <Form.Group controlId="exampleForm.ControlInput1">
                    <Form.Label>Выберите коллекцию: </Form.Label>
                    <Form.Control as="select" onInput={(e)=>setCollectionItem(e.target.value)}>
                        <option></option>
                        {createOptions}
                    </Form.Control>
                </Form.Group>
                <Form.Group controlId="exampleForm.ControlInput2">
                    <Form.Label>Введите название: </Form.Label>
                    <Form.Control type="text" onChange={(e)=>setNameItem(e.target.value)} placeholder='Введите название' />
                </Form.Group>
                <Form.Group controlId="exampleForm.ControlTextarea1">
                    <Form.Label>Введите краткое описание: </Form.Label>
                    <Form.Control as="textarea" rows={3} 
                                    onChange={(e)=>setShortNameItem(e.target.value)}
                                    placeholder='Введите краткое описание' 
                    />
                </Form.Group>
                <Form.Group controlId="exampleForm.ControlInput3">
                    <Form.Label>Выберите тематику: </Form.Label>
                    <Form.Control as="select" onInput={(e)=>setOptionItem(e.target.value)}>
                        <option></option>
                        <option value='alcohol'>Алкоголь</option>
                        <option value='book'>Книга</option>
                    </Form.Control>
                </Form.Group>
                <Form.Group controlId="exampleForm.ControlInput4">
                    <Form.Label>Введите название: </Form.Label>
                    <Form.Control type="text" onChange={(e)=>setUrlPicture(e.target.value)} placeholder='Введите URL'/>
                </Form.Group>
                <Button variant="primary" type="submit" onClick={createItem}>
                    Создать Элемент
                </Button>
            </Form>
            </div>
            <TabelItems />
        </div>
    )
}