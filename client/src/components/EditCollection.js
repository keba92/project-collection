import React, { useState, useEffect } from 'react';
import { Form, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import io from 'socket.io-client';
import { useAuth0 } from '@auth0/auth0-react';

export default function EditCollection(props) {
    const id = props.location.pathname.slice(16);
    const socket = io();
    const [collectionData, setCollectionData] = useState([]);
    const [nameCollection, setNameCollection] = useState('');
    const [shortNameCollection, setShortNameCollection] = useState('');
    const [urlPicture, setUrlPicture] = useState('');
    const [optionCollection, setOptionCollection] = useState('');
    const [poleItem, setPoleItem] = useState({ 'name': 'text', 'teg': 'text'});
    const [namePole, setNamePole] = useState('');
    const [typePole, setTypePole] = useState('');
    const [newId, setNewId] = useState('');
    const { user } = useAuth0();

    useEffect(() => {
        let idUser;
        socket.emit('getCollectionInfo', {
            _id: id
        })
        socket.on('getCollectionDataInfo',(data) => {
            setCollectionData(data);
        })
        if(localStorage.getItem('admin')) {
            idUser = localStorage.getItem('admin');
        } else {
            idUser = user.sub
        }
        setNewId(idUser)
    },[])

    const editCollection = (e) => {
        e.preventDefault();
        socket.emit('editCollection', {
            _id: id,
            name:  (nameCollection!='')? nameCollection: collectionData[0].name,
            description: (shortNameCollection!='')? shortNameCollection: collectionData[0].description,
            teg: (optionCollection!='')? optionCollection: collectionData[0].teg,
            url: (urlPicture!='')? urlPicture: collectionData[0].url,
            poleItem: JSON.stringify(poleItem)
        })
    }

    const addPoleItem = (e) =>{
        e.preventDefault();
        if(namePole !=='' && typePole !==''){
            poleItem[`${namePole}`] = typePole;
        }
        setPoleItem(poleItem);
        console.log(poleItem)
    }

    return(
        (collectionData.length != 0) && (
        <div>
          <Link className='back' to={`/user/${newId}`}>Вернуться к коллекциям</Link>
          <Form>
             <Form.Group controlId="exampleForm.ControlInput2">
                    <Form.Label>Введите название: </Form.Label>
                    <Form.Control type="text" onChange={(e)=>setNameCollection(e.target.value)} placeholder={`${collectionData[0].name}`} />
                </Form.Group>
                <Form.Group controlId="exampleForm.ControlTextarea1">
                    <Form.Label>Введите краткое описание: </Form.Label>
                    <Form.Control as="textarea" rows={3} 
                                    onChange={(e)=>setShortNameCollection(e.target.value)}
                                    placeholder={`${collectionData[0].description}`} 
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
                    <Form.Control type="text" onChange={(e)=>setUrlPicture(e.target.value)} placeholder={`${collectionData[0].url}`}/>
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
                <Button variant="primary" type="submit" onClick={editCollection}>
                    Редактировать
                </Button>
            </Form>
        </div>
        )
    )
}