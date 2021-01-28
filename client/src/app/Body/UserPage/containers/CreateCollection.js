import React, { useState, useEffect, useCallback, Suspense } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { Form, Button, Spinner } from 'react-bootstrap';
import io from 'socket.io-client';
import { useTranslation } from 'react-i18next';
import { useDropzone } from 'react-dropzone';
import { Image } from 'cloudinary-react';
import FormInput from '../components/FormInput';
import FormOption from '../components/FormOption';

const TableCollection = React.lazy(() => import('../components/TableCollection'));

export default function CreateCollection(props) {
  const socket = io({
    transports: ['websocket', 'polling'],
    reconnect: true,
  });
  const [nameCollection, setNameCollection] = useState('');
  const [shortNameCollection, setShortNameCollection] = useState('');
  const [urlPicture, setUrlPicture] = useState('');
  const [temaCollection, setTemaCollection] = useState('');
  const [poleItem, setPoleItem] = useState({ name: 'text', tag: 'text' });
  const [namePole, setNamePole] = useState('');
  const [typePole, setTypePole] = useState('');
  const [dataCollect, setDataCollect] = useState([]);
  const { user, isAuthenticated } = useAuth0();
  const [idUser, setIdUser] = useState(null);
  const { idLink } = props;
  const { t, i18n } = useTranslation();

  useEffect(() => {
    if (!idUser) {
      socket.emit('getAdmins', { message: process.env.REACT_APP_AUTH0_TOKEN });
      socket.on('getAdminsData', (data) => {
        const admins = data.map((el) => el.user_id);
        let id;
        if (isAuthenticated && !admins.includes(user.sub)) {
          id = user.sub;
          setIdUser(id);
        } else if (isAuthenticated && admins.includes(user.sub)) {
          id = idLink;
          localStorage.setItem('admin', id);
          setIdUser(id);
        } else {
          id = 'all';
        }
        socket.emit('getCollection', {
          id: id,
        });
        socket.on('getDataCollect', (data) => {
          setDataCollect(data);
        });
      });
    }
  });

  const addCollection = useCallback(
    (e) => {
      e.preventDefault();
      socket.emit('addCollection', {
        id: idUser,
        name: nameCollection,
        description: shortNameCollection,
        tema: temaCollection,
        url: urlPicture,
        poleItem: JSON.stringify(poleItem),
      });
      socket.on('getDataCollect', (data) => setDataCollect(data), []);
      document.querySelectorAll('.form-create-collect input').forEach((el) => (el.value = ''));
    },
    [idUser, nameCollection, shortNameCollection, temaCollection, urlPicture, poleItem],
  );

  const addPoleItem = useCallback(
    (e) => {
      e.preventDefault();
      if (namePole !== '' && typePole !== '') {
        poleItem[`${namePole}`] = typePole;
      }
      setPoleItem(poleItem);
      alert(`${t('choisePoleF')} ${JSON.stringify(poleItem)}`);
    },
    [namePole, typePole, poleItem],
  );

  const onDrop = useCallback(async (acceptedFiles) => {
    const url = `https://api.cloudinary.com/v1_1/dgeev9d6l/image/upload`;
    const formData = new FormData();
    formData.append('file', acceptedFiles[0]);
    formData.append('upload_preset', 'nllbt9qq');
    const response = await fetch(url, {
      method: 'post',
      body: formData,
    });
    const data = await response.json();
    setUrlPicture(data.public_id);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accepts: 'image/*',
    multiple: false,
  });

  return (
    <div className="create-block">
      <h1 id="createCollect" className="create">
        {t('createCollectionH')}
      </h1>
      <div className="create-item create">
        <Form className="form-create-collect">
          <FormInput
            idContrl="exampleForm.ControlInput2"
            lable="nameCreateF"
            type="text"
            placeholder="enterNameP"
            setFunc={setNameCollection}
            value={nameCollection}
          />
          <FormInput
            idContrl="exampleForm.ControlTextarea1"
            lable="descriptCreateF"
            type="textarea"
            placeholder="descriptCreateF"
            setFunc={setShortNameCollection}
            value={shortNameCollection}
          />
          <FormOption
            idContrl="exampleForm.ControlInput3"
            lable="temaCreateF"
            setFunc={setTemaCollection}
            dataOption={{ alcohol: 'Алкоголь', book: 'Книги', marks: 'Марки', znak: 'Значки' }}
          />
          <Form.Group controlId="exampleForm.ControlInput4">
            <Form.Label>{t('urlCreateF')} </Form.Label>
            <div {...getRootProps()} className={`dropzone ${isDragActive ? 'active' : null}`}>
              <input {...getInputProps()} />
              {isDragActive ? <p>Drop the files here ...</p> : <p>Drop some files here!</p>}
            </div>
            <div style={{ border: '1px solid gray' }}>
              {urlPicture != '' && (
                <Image cloud_name="dgeev9d6l" publicId={urlPicture} width="50" crop="scale" />
              )}
            </div>
          </Form.Group>
          <Form>
            <Form.Label>
              <b>{t('polesCreateF')}</b>
            </Form.Label>
            <FormInput
              idContrl="exampleForm.ControlInput5"
              lable="poleItemF"
              type="text"
              placeholder="poleItemF"
              setFunc={setNamePole}
              value={namePole}
            />
            <FormOption
              idContrl="exampleForm.ControlInput6"
              lable="typePoleF"
              setFunc={setTypePole}
              dataOption={{
                number: 'Числовое',
                text: 'Текстовое(однострочное)',
                textarea: 'Текстовое(многострочное)',
                date: 'Дата',
                checkbox: 'Булевое',
              }}
            />
            <Form.Group controlId="exampleForm.ControlInput7">
              <Button variant="primary" type="submit" onClick={addPoleItem}>
                {t('addB')}
              </Button>
            </Form.Group>
          </Form>
          <Button variant="primary" type="submit" onClick={addCollection}>
            {t('createB')}
          </Button>
        </Form>
      </div>
      <h1 id="myCollect" className="create">
        {t('myCollectionH')}
      </h1>
      <Suspense fallback={<Spinner animation="border" variant="primary" />}>
        <TableCollection dataCollect={dataCollect} />
      </Suspense>
    </div>
  );
}
