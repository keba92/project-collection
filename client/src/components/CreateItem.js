import React, {useState, useEffect, useCallback, useRef} from 'react';
import { Form, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';
import TabelItems from './TableItems';
import io from 'socket.io-client';
import Tags from "@yaireo/tagify/dist/react.tagify"
import '@yaireo/tagify/dist/tagify.css';
import Search from './Search';
import { useTranslation } from 'react-i18next';

export default function CreateItem(props) {
    const socket = io("http://localhost:3001/", { reconnect: true });
    const [collection, setCollection] = useState([]);
    const [itemData, setItemData] = useState({});
    const [dataItems, setDataItems] = useState([]);
    const { user, isAuthenticated } = useAuth0();
    const [id, setId] = useState('');
    const tagifyRef = useRef();
    const [tags, setTags] = useState();
    const [tagifyProps, setTagifyProps] = useState({});
    const { t, i18n } = useTranslation();

    useEffect(()=>{
        setTagifyProps({loading: true})
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
        //get all items from tags
        socket.emit('getItems', {
            idCollect: 'all'
        })
        socket.on('getDataItems',(data) => {
            const arrTags = data.map(el=>el.tag);
            const newArrTags = arrTags.flat();
            const uniqTags =newArrTags.filter((item, idx) => newArrTags.indexOf(item) === idx);
            setTagifyProps((lastProps) => ({
                ...lastProps,
                whitelist: uniqTags,
                loading: false
            }))
        })
        setId(idUser)
    },[])

    const baseTagifySettings = {
        maxTags: 6,
        placeholder: "type something",
        dropdown: {
          enabled: 0 
        }
    }

    const onChange = useCallback((e) => {
        e.persist();
        setTags(e.target.value);
      },[]);

    const settings = {
        ...baseTagifySettings
    }

    const addItem = (e) => {
        e.preventDefault();
        const onlyTags = JSON.parse(tags).map(el=>el.value);
        socket.emit('addItem', {
            idUser: id,
            idCollect: props.location.pathname.slice(12),
            tag: onlyTags,
            dataItem: JSON.stringify(itemData),
            poleItem: collection[0].poleItem
        })
        socket.on('getDataItems',(data) => {
            setDataItems(data);
        },[])
    }

    return (
    <div>
        <Search />
        {(isAuthenticated)&&(<Link className='back' to={`/`}>{t('backMainL')}</Link>)}
        {(isAuthenticated&&id==localStorage.getItem('userId'))&&(<Link className='back' to={`/user/${id}`}>{t('backCollectL')}</Link>)}
        {(isAuthenticated&&id==localStorage.getItem('userId'))&&(<div className='create'>
            <div className='create-block'>
                <h1 className='create'>{t('createItemH')}</h1>
                <Form>
                    {(collection.length != 0)&&(
                        Object.keys(JSON.parse(collection[0].poleItem)).map((keyName, idx) => {
                            if (JSON.parse(collection[0].poleItem)[keyName] == 'checkbox' ) {
                                return(
                                    <Form.Check type="checkbox" id="autoSizingCheck2" name={keyName} onChange={(e) =>{
                                        itemData[e.target.name] = e.target.checked
                                        setItemData(itemData)
                                    }}/>
                                )
                            } else if(JSON.parse(collection[0].poleItem)[keyName] == 'textarea') {
                                return (
                                <Form.Group key={idx} controlId={`ControlInput${idx}`}>
                                       <Form.Label>{t('enterC')} {`${keyName}`}: </Form.Label>
                                       <Form.Control as={`${JSON.parse(collection[0].poleItem)[keyName]}`} rows={3} title={keyName} onChange={(e)=>{
                                           itemData[e.target.title] = e.target.value;
                                           setItemData(itemData);
                                       }} />
                                </Form.Group>
                                )
                            } else if( keyName == 'tag') {
                                return (
                                <Form.Group key={idx} controlId={`ControlInput${idx}`}>
                                       <Form.Label>{t('enterC')} {`${keyName}`}: </Form.Label>
                                       <Tags
                                        style={{backgroundColor: 'white'}}
                                        tagifyRef={tagifyRef}
                                        settings={settings} 
                                        {...tagifyProps}
                                        onChange={onChange}
                                        />
                                </Form.Group>
                                )
                            } else {
                                return (
                                    <Form.Group key={idx} controlId={`ControlInput${idx}`}>
                                        <Form.Label>{t('enterC')} {`${keyName}`}: </Form.Label>
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
                        {t('createB')}
                    </Button>
                </Form>
            </div>
        </div>)}
        <TabelItems dataItems={dataItems} idCollect={props.location.pathname.slice(12)} />  
    </div>
    )
}