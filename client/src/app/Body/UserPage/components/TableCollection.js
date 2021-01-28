import React, { memo, useEffect, useMemo, useState } from 'react';
import { Card, Button } from 'react-bootstrap';
import { MarkdownPreview } from 'react-marked-markdown';
import { Link } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';
import { useTranslation } from 'react-i18next';
import { Image } from 'cloudinary-react';
import DeleteButtonCollect from '../containers/DeleteButtonCollect';

function TableCollection(props) {
  const { dataCollect, setCollect } = props;
  const { user, isAuthenticated } = useAuth0();
  const { t, i18n } = useTranslation();
  const [id, setId] = useState(null);
  useEffect(() => {
    if (isAuthenticated && JSON.parse(localStorage.getItem('arrAdmins')).includes(user.sub)) {
      setId(user.sub);
    }
  });

  const makeCollection = useMemo(
    () =>
      dataCollect.map((el) => {
        if (el) {
          return (
            <Card style={{ width: '25rem' }} key={el._id}>
              <Image cloud_name="dgeev9d6l" publicId={el.url} height="220" />
              <Card.Body key={el._id}>
                <Card.Title>{el.name}</Card.Title>
                <Card.Text>{el.collections}</Card.Text>
                <MarkdownPreview value={el.description} />
                {!id && (
                  <Button
                    variant="primary"
                    type="submit"
                    name={el._id}
                    onClick={(e) => {
                      setCollect(e.target.name);
                    }}
                  >
                    {t('openL')}
                  </Button>
                )}
                {((isAuthenticated && user.sub == el.id) || id) && (
                  <Link to={`/collection/${el._id}`}> {t('openL')} </Link>
                )}
                {((isAuthenticated && user.sub == el.id) || id) && (
                  <Link to={`/editCollection/${el._id}`}> {t('editL')} </Link>
                )}
                {((isAuthenticated && user.sub == el.id) || id) && (
                  <DeleteButtonCollect id={el._id} />
                )}
              </Card.Body>
            </Card>
          );
        }
      }),
    [dataCollect, isAuthenticated, user, t],
  );

  return <div className="table-collection">{makeCollection}</div>;
}

export default memo(TableCollection);
