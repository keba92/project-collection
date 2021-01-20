import React, { useState, useEffect } from 'react';
import TabelItems from '../../UserPage/components/TableItems';
import UserProfileButton from '../components/UserProfileButton';
import io from 'socket.io-client';
import AdminProfileButton from '../components/AdminProfileButton';
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

    const countEl = items.reduce((acc, el) => {
        acc[el.idCollect] = (acc[el.idCollect] || 0) + 1;
        return acc;
    }, {})
    
    return (
        <div className='home-page'>
            <div className='button-main'>
                <div className='buttons'>
                    <AdminProfileButton />
                    <UserProfileButton />
                </div> 
                <Search />
            </div>
            {(choiseTag)&&(<HomeShowResult items={items} choiseTag={choiseTag} setChoiseTag={setChoiseTag} />)}
            <div className='cloud-div'>
                <h1  style={{marginTop:'20px'}}>{t('cloudTagsH')}</h1>
                <div >
                    <TagsCloud setChoiseTag={setChoiseTag} items={items}/>
                </div>
            </div>
            <h1>{t('newItemsH')}</h1>
            <TabelItems dataItems={(items.length>3)?(items.slice(items.length-4,items.length-1)):(items)} idCollect=''/>
            <h1>{t('bigCollectionH')}</h1>
            <div>
                <HomeCollect countEl={countEl} dataCollect={dataCollect} />
            </div>
        </div>
    )
}