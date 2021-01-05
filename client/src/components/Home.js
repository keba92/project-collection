import React, { useState, useEffect } from 'react';
import TabelItems from './TableItems';
import UserProfileButton from './UserProfileButton';
import io from 'socket.io-client';

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
    },[])
    return (
        <div className='home-page'>
            <UserProfileButton />
            <TabelItems dataItems={items} idCollect=''/>
        </div>
    )
}