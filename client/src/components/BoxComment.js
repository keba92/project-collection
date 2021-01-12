import React, { useState, useEffect} from 'react';
import { InputGroup, FormControl, Button } from 'react-bootstrap';
import { useAuth0 } from '@auth0/auth0-react';
import io from 'socket.io-client';

export default function BoxComment(props){
    const [textComment, setTextComment] = useState('');
    const [newArrComment, setNewArrComment] = useState([]);
    const { user } = useAuth0();
    const { id } = props;
    const socket = io();

    useEffect(()=>{
        socket.emit('getComment',{
            idItem: id
        })
        socket.on('getCommentData', (data)=> {
            setNewArrComment(data[0].arrComment);
        })
    },[])

    const makeComment = newArrComment.map((el,idx)=>{
        const obj = JSON.parse(el);
        return(
            <div className='comment' key={idx}>
                <span> <b>{obj.nameUser}</b> </span>
                <p> {obj.message} </p>
            </div>
        )
    })

    const addComment = (e) =>{
        e.preventDefault();
        newArrComment.push(JSON.stringify({
            nameUser: user.name,
            message: textComment
        }));
        setNewArrComment(newArrComment)
        socket.emit('updateComment', {
            idItem: id,
            arrComment: newArrComment 
        })
        socket.emit('getComment',{
            idItem: id
        })
        socket.on('getCommentData', (data)=> {
            setNewArrComment(data[0].arrComment);
        },[])
    }

    return(
        <div className='comment-box'>
            <h4>Комментарии</h4>
            <div className='comment-body'>
                {(newArrComment.length == 0)?(<p>Пока комментариев нет!</p>):(makeComment)}
            </div>
            <div className='comment-footer'>
                <InputGroup className="mb-3">
                    <FormControl
                    placeholder="Введите сообщение"
                    aria-describedby="basic-addon2"
                    onChange={(e)=>setTextComment(e.target.value)}
                    />
                    <InputGroup.Append>
                        <Button 
                        variant="outline-secondary"
                        onClick={addComment}
                        >Отправить</Button>
                    </InputGroup.Append>
                </InputGroup>
            </div>
        </div>
    )
}