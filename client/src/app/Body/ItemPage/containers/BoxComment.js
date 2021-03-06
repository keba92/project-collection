import React, { useState, useEffect } from 'react';
import { InputGroup, FormControl, Button } from 'react-bootstrap';
import { useAuth0 } from '@auth0/auth0-react';
import io from 'socket.io-client';
import { useTranslation } from 'react-i18next';
import PropTypes from 'prop-types';
import Comment from '../components/Comment';

function BoxComment(props) {
  const [textComment, setTextComment] = useState('');
  const [newArrComment, setNewArrComment] = useState([]);
  const { user, isAuthenticated } = useAuth0();
  const { id } = props;
  const socket = io({
    transports: ['websocket', 'polling'],
    reconnect: true,
  });
  const { t, i18n } = useTranslation();

  useEffect(() => {
    async function commentData() {
      await socket.emit('getComment', {
        idItem: id,
      });
      await socket.on('getCommentData', (data) => {
        setNewArrComment(data[0].arrComment);
      });
    }
    commentData();
  }, []);

  const addComment = () => {
    newArrComment.push(
      JSON.stringify({
        nameUser: user.name,
        message: textComment,
      }),
    );
    socket.emit('updateComment', {
      idItem: id,
      arrComment: newArrComment,
    });
    socket.emit('getComment', {
      idItem: id,
    });
    setNewArrComment(newArrComment);
    socket.on(
      'getCommentData',
      (data) => {
        setNewArrComment(data[0].arrComment);
        setTextComment(null);
      },
      [],
    );
    document.querySelector('.comment-message').value = '';
  };

  return (
    <div className="comment-box">
      <h4>{t('commentH')}</h4>
      <div className="comment-body">
        <Comment data={newArrComment} />
      </div>
      {isAuthenticated && (
        <div className="comment-footer">
          <InputGroup className="mb-3" style={{ maxWidth: '400px' }}>
            <FormControl
              className="comment-message"
              placeholder={t('enterMessageP')}
              aria-describedby="basic-addon2"
              onChange={(e) => setTextComment(e.target.value)}
            />
            <InputGroup.Append>
              <Button variant="primary" onClick={() => setTimeout(addComment, 200)}>
                {t('sendB')}
              </Button>
            </InputGroup.Append>
          </InputGroup>
        </div>
      )}
    </div>
  );
}

BoxComment.propTypes = {
  id: PropTypes.string,
};

export default BoxComment;
