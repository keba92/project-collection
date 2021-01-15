import React, { useState, useEffect } from 'react';
import { Form, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import io from 'socket.io-client';
import { useAuth0 } from '@auth0/auth0-react';
import { useTranslation } from 'react-i18next';

export default function EditCollection(props) {
    const id = props.location.pathname.slice(16);
    const socket = io({ reconnect: true });
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
    const { t, i18n } = useTranslation();

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
            tema: (optionCollection!='')? optionCollection: collectionData[0].tema,
            url: (urlPicture!='')? urlPicture: collectionData[0].url,
            poleItem: (Object.keys(poleItem).length==3)?(collectionData[0].poleItem):(JSON.stringify(poleItem))
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
          <Link className='back' to={`/user/${newId}`}>{t('backCollectL')}</Link>
          <Form>
             <Form.Group controlId="exampleForm.ControlInput2">
                    <Form.Label>{t('nameCreateF')} </Form.Label>
                    <Form.Control type="text" onChange={(e)=>setNameCollection(e.target.value)} placeholder={`${collectionData[0].name}`} />
                </Form.Group>
                <Form.Group controlId="exampleForm.ControlTextarea1">
                    <Form.Label>{t('descriptCreateF')} </Form.Label>
                    <Form.Control as="textarea" rows={3} 
                                    onChange={(e)=>setShortNameCollection(e.target.value)}
                                    placeholder={`${collectionData[0].description}`} 
                    />
                </Form.Group>
                <Form.Group controlId="exampleForm.ControlInput3">
                    <Form.Label>{t('temaCreateF')} </Form.Label>
                    <Form.Control as="select" onInput={(e)=>setOptionCollection(e.target.value)}>
                        <option></option>
                        <option value='alcohol'>Алкоголь</option>
                        <option value='book'>Книга</option>
                    </Form.Control>
                </Form.Group>
                <Form.Group controlId="exampleForm.ControlInput4">
                    <Form.Label>{t('urlCreateF')} </Form.Label>
                    <Form.Control type="text" onChange={(e)=>setUrlPicture(e.target.value)} placeholder={`${collectionData[0].url}`}/>
                </Form.Group>
                <Form>
                  <Form.Label><b>{t('polesCreateF')}</b></Form.Label>
                  <Form.Group controlId="exampleForm.ControlInput4">
                    <Form.Label>{t('poleItemF')} </Form.Label>
                    <Form.Control type="text" onChange={(e)=>setNamePole(e.target.value)} placeholder={t('poleItemF')}/>
                    <Form.Label>{t('typePoleF')} </Form.Label>
                    <Form.Control as="select" onInput={(e)=>setTypePole(e.target.value)}>
                        <option></option>
                        <option value='number'>Числовое</option>
                        <option value='text'>Текстовое(однострочное)</option>
                        <option value='textarea'>Текстовое(многострочное)</option>
                        <option value='date'>Дата</option>
                        <option value='checkbox'>Булевое</option>
                    </Form.Control>
                    <Button variant="primary" type="submit" onClick={addPoleItem}>
                        {t('addB')}
                    </Button>
                    <Form.Label>{t('choisePoleF')} {JSON.stringify(poleItem)} </Form.Label>
                  </Form.Group>
                </Form>
                <Button variant="primary" type="submit" onClick={editCollection}>
                    {t('saveB')}
                </Button>
            </Form>
        </div>
        )
    )
}