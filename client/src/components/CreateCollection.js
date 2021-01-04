import React, { useState } from 'react';
import Axios from 'axios';
import { useAuth0 } from "@auth0/auth0-react";
import { Form, Button } from 'react-bootstrap';
import TableCollection from './TableCollection';

export default function CreateCollection() {
    const [nameCollection, setNameCollection] = useState('');
    const [shortNameCollection, setShortNameCollection] = useState('');
    const [urlPicture, setUrlPicture] = useState('');
    const [optionCollection, setOptionCollection] = useState('');
    const [poleItem, setPoleItem] = useState({ 'name': 'text', 'teg': 'text'});
    const [namePole, setNamePole] = useState('');
    const [typePole, setTypePole] = useState('');
    const { user } = useAuth0();

    const addCollection = (e) =>{
        e.preventDefault();
        Axios.post('/addCollection',{
            id: user.sub,
            name: nameCollection,
            description: shortNameCollection,
            teg: optionCollection,
            url: urlPicture,
            poleItem: JSON.stringify(poleItem)
        })
    }

    const addPoleItem = (e) =>{
        e.preventDefault();
        if(namePole !=='' && typePole !==''){
            poleItem[`${namePole}`] = typePole;
            setPoleItem(poleItem);
        }
    }

    return(
        <div className='create-block'>
            <h1 className='create'>Создать коллекцию</h1>
            <div className='create-item create'>
            <Form>
                <Form.Group controlId="exampleForm.ControlInput2">
                    <Form.Label>Введите название: </Form.Label>
                    <Form.Control type="text" onChange={(e)=>setNameCollection(e.target.value)} placeholder='Введите название' />
                </Form.Group>
                <Form.Group controlId="exampleForm.ControlTextarea1">
                    <Form.Label>Введите краткое описание: </Form.Label>
                    <Form.Control as="textarea" rows={3} 
                                    onChange={(e)=>setShortNameCollection(e.target.value)}
                                    placeholder='Введите краткое описание' 
                    />
                </Form.Group>
                <Form.Group controlId="exampleForm.ControlInput3">
                    <Form.Label>Выберите тематику: </Form.Label>
                    <Form.Control as="select" onInput={(e)=>setOptionCollection(e.target.value)}>
                        <option></option>
                        <option value='alcohol'>Алкоголь</option>
                        <option value='book'>Книга</option>
                    </Form.Control>
                </Form.Group>
                <Form.Group controlId="exampleForm.ControlInput4">
                    <Form.Label>Введите название: </Form.Label>
                    <Form.Control type="text" onChange={(e)=>setUrlPicture(e.target.value)} placeholder='Введите URL'/>
                </Form.Group>
                <Form>
                  <Form.Label><b>Создать поля для Item</b></Form.Label>
                  <Form.Group controlId="exampleForm.ControlInput4">
                    <Form.Label>Поля Item: </Form.Label>
                    <Form.Control type="text" onChange={(e)=>setNamePole(e.target.value)} placeholder='Имя поля'/>
                    <Form.Label>Выберите тип поля: </Form.Label>
                    <Form.Control as="select" onInput={(e)=>setTypePole(e.target.value)}>
                        <option></option>
                        <option value='number'>Числовое</option>
                        <option value='text'>Текстовое(однострочное)</option>
                        <option value='textarea'>Текстовое(многострочное)</option>
                        <option value='date'>Дата</option>
                        <option value='checkbox'>Булевое</option>
                    </Form.Control>
                    <Button variant="primary" type="submit" onClick={addPoleItem}>
                        Добавить
                    </Button>
                  </Form.Group>
                </Form>
                <Button variant="primary" type="submit" onClick={addCollection}>
                    Создать Коллекцию
                </Button>
            </Form>
            </div>
            <h1 className='create'>Мои коллекции</h1>
            <TableCollection />
        </div>
    )
}