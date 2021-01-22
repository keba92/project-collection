import React, { useState, useEffect, useCallback } from 'react';
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

    const makeLike = useCallback((e) => {
        if(!like[0].idUsers.includes(user.sub)&& e.target.attributes[2].value == id) {
            const newArrUser = like[0].idUsers.concat();
            newArrUser.push(user.sub);
            setArrUsers(newArrUser);
            socket.emit('updateLike', {
                idItem: id,
                countLike: like[0].countLike + 1,
                idUsers: newArrUser
            })
            socket.emit('getLike', {
                idItem: id
            })
            socket.on('getLikeInfo', (data)=> {
                setLike(data)
            })
        }
    }, [like, id, user] )

    return(
        <>
            <span>
                <i className="fa fa-heart" 
                   aria-hidden="true" 
                   title={id} 
                   onClick={(e)=>makeLike(e)}> {(like.length!=0)&&(like[0].countLike)} </i>
            </span>
        </>
    )
} 