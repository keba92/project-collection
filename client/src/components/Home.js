import React, { useState, useEffect } from 'react';
import TabelItems from './TableItems';
import UserProfileButton from './UserProfileButton';
import io from 'socket.io-client';
import AdminProfileButton from './AdminProfileButton';
import Search from './Search';
import TableCollection from './TableCollection';
import { TagCloud } from 'react-tagcloud';
import { useTranslation } from 'react-i18next';
import ResultSearch from './ResultSearch';
import { Button } from 'react-bootstrap';

export default function Home() {
    const [items, setItems] = useState([]);
    const [dataCollect, setDataCollect] = useState([]);
    const [choiseTag, setChoiseTag] = useState(null);
    const socket = io("http://localhost:3001/",{ transports: [ 'websocket', 'polling' ], reconnect: true });
    const { t, i18n } = useTranslation();
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

    const collect = () => {
        const sortable = [];
        for (const cont in countEl) {
            sortable.push([cont, countEl[cont]]);
        }
        sortable.sort((a, b)=> {
            return a[1] - b[1];
        });
        const newSort = sortable.map(el=>el[0]).reverse();
        const newCollect = [];
        newSort.forEach((el,idx)=>{
            const colect = dataCollect.find((elem)=>{
                if(elem._id== el) return elem;
            })
            newCollect[idx] = colect
        })

        return(<TableCollection dataCollect={newCollect}/>)
    }

    const customRenderer = (tag, size, color) => (
        <span
          key={tag.value}
          style={{
            animation: 'blinker 3s linear infinite',
            animationDelay: `${Math.random() * 2}s`,
            fontSize: `${size / 2}em`,
            border: `5px solid ${color}`,
            margin: '3px',
            padding: '3px',
            display: 'inline-block',
            background: `${color}`,
          }}
          > 
          <p style={{cursor: 'pointer', color: '#0b2937'}} onClick={(e)=>setChoiseTag(e.target.innerHTML)}>{tag.value}</p> 
          </span>
      )

      const makedataCloud = () => {
          const itemsTag = items.map((el)=>el.tag)
          const countTag = itemsTag.flat().reduce((acc,el)=>{
              acc[el] = (acc[el] || 0) + 1;
              return acc;
          },{})
          const arrTags = Object.keys(countTag).map(el=>{
              return {
                  value: el,
                  count: countTag[el]
                }
            })
        return(<TagCloud tags={arrTags} minSize={2} maxSize={7} renderer={customRenderer} />)
    }

    const makeResult = () => {
        const tegsItems=[];
        items.forEach((el) =>{
            if(el.tag.includes(choiseTag)) tegsItems.push(el);
        })
        return (
            (tegsItems)&&(
            <div>
                <Button variant="danger" 
                        style={{float:'right'}} 
                        onClick={()=>setChoiseTag(null)}>
                            Close
                </Button>
                <ResultSearch data={tegsItems}/>
            </div>)
        )
    }

    
    return (
        <div className='home-page'>
            <div className='button-main'>
                <div className='buttons'>
                    <AdminProfileButton />
                    <UserProfileButton />
                </div> 
                <Search />
            </div>
            {(choiseTag)&&(makeResult())}
            <div className='cloud-div'>
                <h1  style={{marginTop:'20px'}}>{t('cloudTagsH')}</h1>
                <div >
                    {makedataCloud()}
                </div>
            </div>
            <h1>{t('newItemsH')}</h1>
            <TabelItems dataItems={(items.length>3)?(items.slice(items.length-4,items.length-1)):(items)} idCollect=''/>
            <h1>{t('bigCollectionH')}</h1>
            <div>
                {collect()}
            </div>
        </div>
    )
}