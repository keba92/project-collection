import React, { useState, useEffect } from 'react';
import TabelItems from './TableItems';
import UserProfileButton from './UserProfileButton';
import io from 'socket.io-client';
import AdminProfileButton from './AdminProfileButton';

export default function Home() {
    const [items, setItems] = useState([]); 
    const socket = io();
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
    },[])
    return (
        <div className='home-page'>
            <AdminProfileButton />
            <UserProfileButton />
            <TabelItems dataItems={items} idCollect=''/>
        </div>
    )
}