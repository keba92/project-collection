import React, { useState, useEffect } from 'react';
import { useAuth0 } from "@auth0/auth0-react";
import { Form, Button } from 'react-bootstrap';
import TableCollection from './TableCollection';
import io from 'socket.io-client';
import { useTranslation } from 'react-i18next';

export default function CreateCollection(props) {
    const socket = io(`${window.location.origin}/`,{transports: ['websocket'], rejectUnauthorized: false});
    const [nameCollection, setNameCollection] = useState('');
    const [shortNameCollection, setShortNameCollection] = useState('');
    const [urlPicture, setUrlPicture] = useState('');
    const [temaCollection, setTemaCollection] = useState('');
    const [poleItem, setPoleItem] = useState({ 'name': 'text', 'tag': 'text'});
    const [namePole, setNamePole] = useState('');
    const [typePole, setTypePole] = useState('');
    const [dataCollect, setDataCollect] = useState([]);
    const { user, isAuthenticated } = useAuth0();
    const [idUser, setIdUser] = useState('');
    const { idLink } = props;
    const { t, i18n } = useTranslation();

    useEffect(() => {
        const getUserMetadata = async () => {
            try {
                const admindataResponse = await fetch('https://dev-lma8p4gy.eu.auth0.com/api/v2/roles/rol_T31Z6EKjiFLeoH0T/users',{
                    method: 'GET',
                    headers: {
                        Authorization: `Bearer ${process.env.REACT_APP_AUTH0_TOKEN}`,
                      },
                    scope: "read:users",
                }
              );
              const adminsInfo = await admindataResponse.json();
              const admins = await adminsInfo.map(el => el.user_id);
              let admin;
              if (admins.includes(user.sub)){
                admin = true;
              }
              let id;
              if (isAuthenticated && !admin) {
                  id = user.sub;
                  setIdUser(id)
              } else if (isAuthenticated && admin) {
                  id = idLink;
                  localStorage.setItem('admin', id)
                  setIdUser(id)
              } else {
                  id = 'all';
              }
              await socket.emit('getCollection', {
                  id: id
              })
              await socket.on('getDataCollect',(data) => {
                  setDataCollect(data);
              })
            } catch (e) {
              console.log(e.message);
            }
        };
        if(idUser==''||dataCollect.length==0) {
            getUserMetadata();
        }
    },[]);

    const addCollection = (e) =>{
        e.preventDefault();
        socket.emit('addCollection', {
            id: idUser,
            name: nameCollection,
            description: shortNameCollection,
            tema: temaCollection,
            url: urlPicture,
            poleItem: JSON.stringify(poleItem)
        })
        socket.on('getDataCollect',(data) => {
            setDataCollect(data);
        },[])
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
        <div className='create-block'>
            <h1 className='create'>{t('createCollectionH')}</h1>
            <div className='create-item create'>
            <Form>
                <Form.Group controlId="exampleForm.ControlInput2">
                    <Form.Label>{t('nameCreateF')} </Form.Label>
                    <Form.Control type="text" onChange={(e)=>setNameCollection(e.target.value)} placeholder={t('enterNameP')} />
                </Form.Group>
                <Form.Group controlId="exampleForm.ControlTextarea1">
                    <Form.Label>{t('descriptCreateF')} </Form.Label>
                    <Form.Control as="textarea" rows={3} 
                                    onChange={(e)=>setShortNameCollection(e.target.value)}
                                    placeholder={t('descriptCreateF')} 
                    />
                </Form.Group>
                <Form.Group controlId="exampleForm.ControlInput3">
                    <Form.Label>{t('temaCreateF')} </Form.Label>
                    <Form.Control as="select" onInput={(e)=>setTemaCollection(e.target.value)}>
                        <option></option>
                        <option value='alcohol'>Алкоголь</option>
                        <option value='book'>Книги</option>
                        <option value='marks'>Марки</option>
                        <option value='znak'>Значки</option>
                    </Form.Control>
                </Form.Group>
                <Form.Group controlId="exampleForm.ControlInput4">
                    <Form.Label>{t('urlCreateF')} </Form.Label>
                    <Form.Control type="text" onChange={(e)=>setUrlPicture(e.target.value)} placeholder={t('enterUrlP')}/>
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
                <Button variant="primary" type="submit" onClick={addCollection}>
                    {t('createB')}
                </Button>
            </Form>
            </div>
            <h1 className='create'>{t('myCollectionH')}</h1>
            <TableCollection dataCollect={dataCollect}/>
        </div>
    )
}