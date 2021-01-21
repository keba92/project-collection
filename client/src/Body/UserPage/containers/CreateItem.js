import React, {useState, useEffect, useCallback, useRef} from 'react';
import { Form, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';
import TabelItems from '../components/TableItems';
import io from 'socket.io-client';
import Tags from "@yaireo/tagify/dist/react.tagify"
import '@yaireo/tagify/dist/tagify.css';
import Search from '../../HomePage/containers/Search';
import { useTranslation } from 'react-i18next';
import { CSVLink } from "react-csv";

export default function CreateItem(props) {
    const socket = io({ transports: [ 'websocket', 'polling' ], reconnect: true });
    const [collection, setCollection] = useState([]);
    const [itemData, setItemData] = useState({});
    const [dataItems, setDataItems] = useState([]);
    const { user, isAuthenticated } = useAuth0();
    const [id, setId] = useState('');
    const tagifyRef = useRef();
    const [tags, setTags] = useState();
    const [tagifyProps, setTagifyProps] = useState({});
    const { t, i18n } = useTranslation();
    const [headersCSV, setHeadersCSV] = useState(null);
    const [resultItems, setResultItems] = useState(null);

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
            try {
                const newDataCSV = data.filter((el)=>{
                    if (el.idCollect == props.location.pathname.slice(12)){
                        return el;
                    }
                }).map(el=> {
                    const arr = JSON.parse(el.dataItem)
                    return arr;
                })
                setHeadersCSV(newDataCSV)
            } catch (err) {
                console.log(err)
            }
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
    }, [])

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

    const addItem = useCallback((e) => {
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
    }, [tags, id, props, itemData, collection])

    const findItem = useCallback((word) => {
        if(word){
            const itemsCollection = dataItems.filter((el)=>{
                if (el.idCollect == props.location.pathname.slice(12)){
                    return el;
                }
            }).map(el=> {
                const obj = {};
                const arr = JSON.parse(el.dataItem);
                obj[el._id] = arr;
                return obj;
            })
            const arrResult = [];
            itemsCollection.forEach(el=> {
                Object.keys(el).forEach(keyName =>{
                    if (Object.values(el[keyName]).includes(word)) {
                        const result = dataItems.filter(el=> el._id == keyName);
                        arrResult.push(...result)
                    }
                })
            })
            setResultItems(arrResult)
        } else {
            setResultItems(dataItems)
        }
    }, [dataItems, props])

    let createOptions;

    try {
        createOptions = () => {
            const obj = {};
            const itemsCollection = dataItems.filter((el)=>{
                if (el.idCollect == props.location.pathname.slice(12)){
                    return el;
                }
            }).map(el=> {
                const arr = JSON.parse(el.dataItem)
                return arr;
            })
            let names = [];
            if(itemsCollection.length!=0){
                names = Object.keys(itemsCollection[0]);
                names.forEach(el => { obj[el] = [] });
                itemsCollection.forEach((el) => {
                    Object.keys(el).forEach((keyName) => {
                        obj[keyName].push(String(el[keyName]))
                    })
                })
            }
            if (names.length !=0){
                return Object.keys(obj).map((keyName,idx) => {
                    return (
                        <select className='filter'
                                style={{maxWidth:'18%', margin:'1%', backgroundColor:'white'}}
                                key={idx}
                                onInput={e=>findItem(e.target.value)}
                            >
                            <option value="" selected>{keyName}</option>
                            {
                                obj[keyName].map(el => {
                                    return (
                                        <option value={el}>{el}</option>
                                    )
                                })
                            }
                        </select>
                    )
                })
            }
        }

    } catch(e) {
        console.log(e);
    }
    
    return (
    <div>    
        <div className='button-main'>
            <div className='buttons'>
                {(isAuthenticated)&&(<Link className='back' to={`/`}>{t('backMainL')}</Link>)}
                {(isAuthenticated&&id==localStorage.getItem('userId'))&&(
                <Link className='back' to={`/user/${id}`}>{t('backCollectL')}</Link>)}
                {(headersCSV)&&(<div style={{float: 'right', marginLeft:'10px'}}>
                    <CSVLink data={headersCSV} filename='collection.csv' separator={';'}>
                        Download CSV
                    </CSVLink>
                </div>)}
            </div>
            <Search />
        </div>
        {(isAuthenticated&&id==localStorage.getItem('userId')||JSON.parse(localStorage.getItem('arrAdmins')).includes(user.sub))&&
        (<div className='create'>
            <div className='create-block'>
                <h1 className='create'>{t('createItemH')}</h1>
                <Form>
                    {(collection.length != 0)&&(
                        Object.keys(JSON.parse(collection[0].poleItem)).map((keyName, idx) => {
                            if (JSON.parse(collection[0].poleItem)[keyName] == 'checkbox' ) {
                                return(
                                    <Form.Group key={idx} controlId={`ControlInput${idx}`}>
                                        <Form.Label>{`${keyName}`}</Form.Label>
                                        <Form.Check type="checkbox" id="autoSizingCheck2" name={keyName} onChange={(e) =>{
                                            itemData[e.target.name] = e.target.checked
                                            setItemData(itemData)
                                        }}/>
                                    </Form.Group>
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
        <div className='filter'>
            <h1>{t('filterH')}</h1>
            <div className='filterBox'>
                {createOptions()}
            </div>
        </div>
        <TabelItems dataItems={(resultItems)?resultItems:dataItems} idCollect={props.location.pathname.slice(12)} />  
    </div>
    )
}