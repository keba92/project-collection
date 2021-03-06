import React, { useState, useEffect, useCallback } from 'react';
import io from 'socket.io-client';
import { useAuth0 } from '@auth0/auth0-react';
import PropTypes from 'prop-types';

function LikeButton(props) {
  const socket = io({
    transports: ['websocket', 'polling'],
    reconnect: true,
  });
  const { id } = props;
  const [like, setLike] = useState([]);
  const { user, isAuthenticated } = useAuth0();

  useEffect(() => {
    socket.emit('getLike', {
      idItem: id,
    });
    socket.on('getLikeInfo', (data) => {
      setLike(data);
    });
  }, []);

  const makeLike = useCallback(
    (e) => {
      if (!like[0].idUsers.includes(user.sub) && e.target.attributes[2].value == id) {
        const newArrUser = like[0].idUsers.concat();
        newArrUser.push(user.sub);
        socket.emit('updateLike', {
          idItem: id,
          countLike: like[0].countLike + 1,
          idUsers: newArrUser,
        });
        socket.emit('getLike', {
          idItem: id,
        });
        socket.on('getLikeInfo', (data) => setLike(data));
      }
    },
    [like, id, user],
  );

  return (
    <>
      <span>
        <i
          className="fa fa-heart"
          aria-hidden="true"
          title={id}
          onClick={(e) => {
            if (isAuthenticated) makeLike(e);
          }}
        >
          {' '}
          {like.length != 0 && like[0].countLike}{' '}
        </i>
      </span>
    </>
  );
}

LikeButton.propTypes = {
  id: PropTypes.string,
};

export default LikeButton;
