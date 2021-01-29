import React, { useState, useEffect, useMemo } from 'react';
import { Card, Spinner } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import io from 'socket.io-client';
import { useTranslation } from 'react-i18next';
import { useAuth0 } from '@auth0/auth0-react';
import DeleteButtonItem from './DeleteButtonItem';
import LikeButton from './LikeButton';
import BoxComment from './BoxComment';
import ItemBody from '../components/ItemBody';
import NavMenu from '../../HomePage/components/NavMenu';

export default function ItemInfo(props) {
  const socket = io({
    transports: ['websocket', 'polling'],
    reconnect: true,
  });
  const { user, isAuthenticated } = useAuth0();
  const [item, setItem] = useState([]);
  const { t, i18n } = useTranslation();
  useEffect(() => {
    async function dataItem() {
      if (item.length == 0) {
        await socket.emit('getItemInfo', {
          _id: props.location.pathname.slice(6),
        });
      }
      await socket.on('getItemDataInfo', (data) => setItem(data));
    }
    if (item.length == 0) dataItem();
  });
  const makeItem = useMemo(
    () =>
      item.map((el, idx) => {
        const data = JSON.parse(el.dataItem);
        const pole = JSON.parse(el.poleItem);
        return (
          <Card style={{ minWidth: '15rem' }} key={idx}>
            <ItemBody data={data} pole={pole} el={el} />
            <LikeButton id={props.location.pathname.slice(6)} />
            {((isAuthenticated && user.sub == el.idUser) || localStorage.getItem('admin')) && (
              <div>
                <DeleteButtonItem id={props.location.pathname.slice(6)} />
                <Link to={`/editItem/${props.location.pathname.slice(6)}`}>{t('editL')}</Link>
              </div>
            )}
          </Card>
        );
      }),
    [isAuthenticated, item, props, user],
  );

  return (
    <div>
      <NavMenu page="item" />
      <div className="content-item">
        {item.length == 0 ? <Spinner animation="border" variant="primary" /> : makeItem}
        {item.length == 0 ? (
          <Spinner animation="border" variant="primary" />
        ) : (
          <BoxComment id={props.location.pathname.slice(6)} />
        )}
      </div>
    </div>
  );
}
