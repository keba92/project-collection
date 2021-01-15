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

export default function Home() {
    const [items, setItems] = useState([]);
    const [dataCollect, setDataCollect] = useState([]);
    const [choiseTag, setChoiseTag] = useState(null)
    const socket = io("http://localhost:3001/", { reconnect: true });
    const { t, i18n } = useTranslation();
     useEffect(() => {
        socket.emit('getItems', {
            idCollect: 'all'
        })
        socket.on('getDataItems',(data) => {
            setItems(data);
        })
        socket.emit('getAdmins', { message: process.env.REACT_APP_AUTH0_TOKEN});
        socket.on('getAdminsData', (async(adminsInfo)=>{
            const admins = await adminsInfo.map(el => el.user_id);
            localStorage.setItem('arrAdmins', JSON.stringify(admins))
        }))
        socket.emit('getCollection', {
            id: 'all'
        })
        socket.on('getDataCollect', (data)=> {
            setDataCollect(data)
        })
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
            border: `2px solid ${color}`,
            margin: '3px',
            padding: '3px',
            display: 'inline-block',
            color: {color},
          }}
          > 
          <p style={{cursor: 'pointer'}} onClick={(e)=>setChoiseTag(e.target.innerHTML)}>{tag.value}</p> 
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
        return(<TagCloud tags={arrTags} minSize={3} maxSize={10} renderer={customRenderer} />)
    }

    const makeResult = () => {
        const tegsItems=[];
        items.forEach((el) =>{
            if(el.tag.includes(choiseTag)) tegsItems.push(el);
        })
        console.log(tegsItems)
        return (
            (tegsItems)&&(<div>
                <button style={{float:'right', backgroundColor: 'tomato'}} onClick={()=>setChoiseTag(null)}>Close</button>
                <ResultSearch data={tegsItems}/>
            </div>)
        )
    }

    
    return (
        <div className='home-page'>     
            <Search />
            <AdminProfileButton />
            <UserProfileButton />
            {(choiseTag)&&(makeResult())}
            <h3>{t('cloudTagsH')}</h3>
            <div className='cloud-div'>
                {makedataCloud()}
            </div>
            <h3>{t('newItemsH')}</h3>
            <TabelItems dataItems={items} idCollect=''/>
            <h3>{t('bigCollectionH')}</h3>
            {collect()}
        </div>
    )
}