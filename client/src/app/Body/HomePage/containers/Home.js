import React, { useState, useEffect, useMemo } from 'react';
import TabelItems from '../../UserPage/components/TableItems';
import UserProfileButton from '../components/UserProfileButton';
import io from 'socket.io-client';
import AdminProfileButton from '../components/AdminProfileButton';
import { Spinner } from 'react-bootstrap';
import Search from './Search';
import { useTranslation } from 'react-i18next';
import TagsCloud from '../components/TagsCloud';
import HomeShowResult from '../components/HomeShowResult';
import HomeCollect from '../components/HomeCollect';

export default function Home() {
    const [items, setItems] = useState([]);
    const [dataCollect, setDataCollect] = useState([]);
    const [choiseTag, setChoiseTag] = useState(null);
    const { t, i18n } = useTranslation();
    const socket = io({ transports: [ 'websocket', 'polling' ], reconnect: true });
     useEffect(() => {
         const getData = async ()=>{
            await socket.emit('getItems', {
                idCollect: 'all'
            })
            await socket.on('getDataItems',(data) => {
                setItems(data);
            })
            await socket.emit('getAdmins', { message: process.env.REACT_APP_AUTH0_TOKEN});
            await socket.on('getAdminsData', (async(adminsInfo)=>{
                const admins = await adminsInfo.map(el => el.user_id);
                localStorage.setItem('arrAdmins', JSON.stringify(admins))
            }))
            await socket.emit('getCollection', {
                id: 'all'
            })
            await socket.on('getDataCollect', (data)=> {
                setDataCollect(data)
            })
         }
         getData(); 
    },[])

    const countEl = useMemo(()=>items.reduce((acc, el) => {
        acc[el.idCollect] = (acc[el.idCollect] || 0) + 1;
        return acc;
    }, {}),[items])
    
    return (
        <div className='home-page'>
            <div className='button-main'>
                <div className='buttons flex-button'>
                    <AdminProfileButton />
                    <UserProfileButton />
                </div> 
                <Search />
            </div>
            {(choiseTag)&&(<HomeShowResult items={items} choiseTag={choiseTag} setChoiseTag={setChoiseTag} />)}
            <div className='cloud-div'>
                <div >
                    {(items.length==0)?(<Spinner animation="border" variant="primary" />)
                                      :(<TagsCloud setChoiseTag={setChoiseTag} items={items}/>)}
                </div>
            </div>
            <h1>{t('newItemsH')}</h1>
            {(items.length==0)?(<Spinner animation="border" variant="primary" />)
                              :(<TabelItems dataItems={(items.length>3)?(items.slice(items.length-3,items.length)):(items)} idCollect=''/>)}
            <h1>{t('bigCollectionH')}</h1>
            <div>
                {(dataCollect.length==0)?(<Spinner animation="border" variant="primary" />)
                                        :(<HomeCollect countEl={countEl} dataCollect={dataCollect} />)}
            </div>
        </div>
    )
}