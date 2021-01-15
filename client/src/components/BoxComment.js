import React, { useState, useEffect} from 'react';
import { InputGroup, FormControl, Button } from 'react-bootstrap';
import { useAuth0 } from '@auth0/auth0-react';
import io from 'socket.io-client';
import { useTranslation } from 'react-i18next';
import Comment from './Comment';

export default function BoxComment(props){
    const [textComment, setTextComment] = useState('');
    const [newArrComment, setNewArrComment] = useState([]);
    const { user } = useAuth0();
    const { id } = props;
    const socket = io({ reconnect: true });
    const { t, i18n } = useTranslation();

    useEffect(()=>{
        socket.emit('getComment',{
            idItem: id
        })
        socket.on('getCommentData', (data)=> {
            setNewArrComment(data[0].arrComment);
        })
    },[])

    const addComment = () =>{
        newArrComment.push(JSON.stringify({
            nameUser: user.name,
            message: textComment
        }));
        socket.emit('updateComment', {
            idItem: id,
            arrComment: newArrComment 
        })
        socket.emit('getComment',{
            idItem: id
        })
        setNewArrComment(newArrComment)
        socket.on('getCommentData', (data)=> {
            setNewArrComment(data[0].arrComment);
            setTextComment(null)
            document.querySelector('.message').value=null;
        },[])
    }

    return(
        <div className='comment-box'>
            <h4>{t('commentH')}</h4>
            <div className='comment-body'>
                <Comment data={newArrComment}/>
            </div>
            <div className='comment-footer'>
                <input className='message' placeholder={t('enterMessageP')} onChange={(e)=>setTextComment(e.target.value)}/>
                <Button 
                        style={{color:'black'}}
                        variant="primary"
                        onClick={()=>setTimeout(addComment,1500)}
                        >{t('sendB')}
                </Button>
            </div>
        </div>
    )
}