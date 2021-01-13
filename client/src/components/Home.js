import React, { useState, useEffect } from 'react';
import TabelItems from './TableItems';
import UserProfileButton from './UserProfileButton';
import io from 'socket.io-client';
import AdminProfileButton from './AdminProfileButton';
import Search from './Search';
import TableCollection from './TableCollection';
import { TagCloud } from 'react-tagcloud';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

export default function Home() {
    const [items, setItems] = useState([]);
    const [dataCollect, setDataCollect] = useState([]);
    const socket = io();
    const { t, i18n } = useTranslation();
     useEffect(() => {
        socket.emit('getItems', {
            idCollect: 'all'
        })
        socket.on('getDataItems',(data) => {
            setItems(data);
        })
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
                localStorage.setItem('arrAdmins', JSON.stringify(admins))
            }catch (e) {
                  console.log(e.message);
                }
        };
        getUserMetadata();
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
            color: 'white',
          }}
        >
          <Link to={`/collection/${tag.link}`}> {tag.value} </Link>
        </span>
      )

      const makedataCloud = () => {
        const arrCollect = dataCollect.map((el) => {
            return {
                value: el.name,
                count: countEl[el._id],
                link: el._id
            }
        })

        return(<TagCloud tags={arrCollect} minSize={1} maxSize={5} renderer={customRenderer} />)
    }

      //if(items.length>5) items.reverse().splice(5);
    
    return (
        <div className='home-page'>     
            <Search />
            <AdminProfileButton />
            <UserProfileButton />
            <h4>{t('newItemsH')}</h4>
            <TabelItems dataItems={items} idCollect=''/>
            <h4>{t('bigCollectionH')}</h4>
            {collect()}
            <h4>{t('cloudTagsH')}</h4>
            <div className='cloud-div'>
                {makedataCloud()}
            </div>
        </div>
    )
}