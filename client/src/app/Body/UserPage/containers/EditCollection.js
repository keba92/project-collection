import React, { useState, useEffect, useCallback } from 'react';
import { Form, Button, Spinner } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import io from 'socket.io-client';
import { useAuth0 } from '@auth0/auth0-react';
import { useTranslation } from 'react-i18next';
import {useDropzone} from 'react-dropzone';
import { Image } from 'cloudinary-react';
import FormInput from '../components/FormInput';
import FormOption from '../components/FormOption';

export default function EditCollection(props) {
    const id = props.location.pathname.slice(16);
    const socket = io({ transports: [ 'websocket', 'polling' ], reconnect: true });
    const [collectionData, setCollectionData] = useState([]);
    const [nameCollection, setNameCollection] = useState('');
    const [shortNameCollection, setShortNameCollection] = useState('');
    const [urlPicture, setUrlPicture] = useState('');
    const [optionCollection, setOptionCollection] = useState('');
    const [poleItem, setPoleItem] = useState({ 'name': 'text', 'tag': 'text'});
    const [namePole, setNamePole] = useState('');
    const [typePole, setTypePole] = useState('');
    const [newId, setNewId] = useState('');
    const { user } = useAuth0();
    const [loading, setLoading] = useState(true);
    const { t, i18n } = useTranslation();

    useEffect(() => {
        let idUser;
        socket.emit('getCollectionInfo', {
            _id: id
        })
        socket.on('getCollectionDataInfo',(data) => {
            setCollectionData(data);
            setLoading(false);
        })
        if(localStorage.getItem('admin')) {
            idUser = localStorage.getItem('admin');
        } else {
            idUser = user.sub
        }
        setNewId(idUser)
    },[])

    const editCollection = useCallback((e) => {
        e.preventDefault();
        socket.emit('editCollection', {
            _id: id,
            name:  (nameCollection!='')? nameCollection: collectionData[0].name,
            description: (shortNameCollection!='')? shortNameCollection: collectionData[0].description,
            tema: (optionCollection!='')? optionCollection: collectionData[0].tema,
            url: (urlPicture!='')? urlPicture: collectionData[0].url,
            poleItem: (Object.keys(poleItem).length==2)?(collectionData[0].poleItem):(JSON.stringify(poleItem))
        })
        window.location.assign(`/collection/${id}`)
    },[id, nameCollection, collectionData, shortNameCollection, optionCollection, urlPicture, poleItem])

    const addPoleItem = useCallback((e) =>{
        e.preventDefault();
        if(namePole !=='' && typePole !==''){
            poleItem[`${namePole}`] = typePole;
        }
        setPoleItem(poleItem);
    }, [namePole, typePole])

    const onDrop = useCallback(async(acceptedFiles) => {
        const url = `https://api.cloudinary.com/v1_1/dgeev9d6l/image/upload`;
        const formData = new FormData();
        formData.append('file', acceptedFiles[0]);
        formData.append('upload_preset', 'nllbt9qq')
        const response = await fetch(url, {
            method: 'post',
            body: formData
        })
        const data = await response.json();
        setUrlPicture(data.public_id);
      }, [])

    const {getRootProps, getInputProps, isDragActive} = useDropzone({
        onDrop,
        accepts: "image/*",
        multiple: false,
    });

    return(
        (collectionData.length != 0) && (
        <div>
          <div className='button-main flex-button'>
            <Link className='back' to={`/user/${newId}`}>{t('backCollectL')}</Link>
          </div>
          <div className="create">
          {(loading)?(<Spinner animation="border" variant="primary" />):
            (<Form>
                <FormInput idContrl="exampleForm.ControlInput2"
                          lable='nameCreateF'
                          type='text'
                          placeholder='enterNameP'
                          setFunc={setNameCollection}
                          value={nameCollection} />
                <FormInput idContrl="exampleForm.ControlTextarea1"
                          lable='descriptCreateF'
                          type='textarea'
                          placeholder='descriptCreateF'
                          setFunc={setShortNameCollection}
                          data={`${collectionData[0].description}`} />
                <FormOption idContrl="exampleForm.ControlInput3"
                            lable='temaCreateF'
                            setFunc={setOptionCollection}
                            dataOption={{alcohol: 'Алкоголь',
                                         book: 'Книги',
                                         marks: 'Марки',
                                         znak: 'Значки'}} />
                <Form.Group controlId="exampleForm.ControlInput4">
                    <div {...getRootProps()} className={`dropzone ${isDragActive ? 'active': null}`}>
                        <input {...getInputProps()} />
                        {
                            isDragActive ?
                            <p>Drop the files here ...</p> :
                            <p>Drop some files here!</p>
                        }
                    </div>
                    <div style={{border: "1px solid gray"}}>
                        {(urlPicture!='')&&(<Image cloud_name='dgeev9d6l' publicId={urlPicture}  width="50" crop="scale" />)}
                    </div>
                </Form.Group>
                <Form>
                  <Form.Label><b>{t('polesCreateF')}</b></Form.Label>
                  <FormInput idContrl="exampleForm.ControlInput4"
                            lable='poleItemF'
                            type='text'
                            placeholder='poleItemF'
                            setFunc={setNamePole}
                            value={namePole} />
                  <FormOption idContrl="exampleForm.ControlInput6"
                            lable='typePoleF'
                            setFunc={setTypePole}
                            dataOption={{number: 'Числовое',
                                         text: 'Текстовое(однострочное)',
                                         textarea: 'Текстовое(многострочное)',
                                         date: 'Дата',
                                         checkbox: 'Булевое'}} />
                  <Form.Group controlId="exampleForm.ControlInput8">
                    <Button variant="primary" type="submit" onClick={addPoleItem}>
                        {t('addB')}
                    </Button>
                    <Form.Label>{t('choisePoleF')} {JSON.stringify(poleItem)} </Form.Label>
                  </Form.Group>
                </Form>
                <Button variant="primary" type="submit" onClick={editCollection}>
                    {t('saveB')}
                </Button>
            </Form>)}
          </div> 
        </div>
        )
    )
}