import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
import { useAuth0 } from '@auth0/auth0-react';

export default function LikeButton(props) {
    const socket = io({ transports: [ 'websocket', 'polling' ], reconnect: true });
    const { id } = props;
    const [like, setLike] = useState([]);
    const [arrUsers, setArrUsers] = useState([]);
    const { user } = useAuth0();

    useEffect(()=>{
        socket.emit('getLike', {
            idItem: id
        })
        socket.on('getLikeInfo', (data)=> {
            setLike(data)
        })
    },[])

    const makeLike = async () => {
        if(!like[0].idUsers.includes(user.sub)) {
            const newArrUser = like[0].idUsers.concat();
            newArrUser.push(user.sub);
            setArrUsers(newArrUser);
            await socket.emit('updateLike', {
                idItem: id,
                countLike: like[0].countLike + 1,
                idUsers: arrUsers
            })
            await socket.emit('getLike', {
                idItem: id
            })
            await socket.on('getLikeInfo', (data)=> {
                setLike(data)
            })
        }
    }

    return(
        <>
            <span>
                <i className="fa fa-heart" aria-hidden="true" name={id} onClick={()=>makeLike()}> {(like.length!=0)&&(like[0].countLike)} </i>
            </span>
        </>
    )
} 