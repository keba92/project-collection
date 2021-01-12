import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
import { useAuth0 } from '@auth0/auth0-react';

export default function LikeButton(props) {
    const socket = io("http://localhost:3001/");
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

    const makeLike = (e) => {
        e.preventDefault();
        if(!like[0].idUsers.includes(user.sub)) {
            const newArrUser = like[0].idUsers.concat();
            newArrUser.push(user.sub);
            setArrUsers(newArrUser);
            socket.emit('updateLike', {
                idItem: id,
                countLike: like[0].countLike + 1,
                idUsers: arrUsers
            })
            socket.emit('getLike', {
                idItem: id
            })
            socket.on('getLikeInfo', (data)=> {
                setLike(data)
            })
        }
    }

    return(
        <>
            <span>
                <i className="fa fa-heart" aria-hidden="true" onClick={makeLike}> {(like.length!=0)&&(like[0].countLike)} </i>
            </span>
        </>
    )
} 