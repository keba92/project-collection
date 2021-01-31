import React, { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import PropTypes from 'prop-types';

function Comment(props) {
  const { data } = props;
  const { t, i18n } = useTranslation();
  const makeComment = useMemo(
    () =>
      data.map((el, idx) => {
        const obj = JSON.parse(el);
        return (
          <>
            <span key={idx}>
              {' '}
              <b>{obj.nameUser}</b>{' '}
            </span>
            <p key={idx}> {obj.message} </p>
          </>
        );
      }),
    [data],
  );

  return (
    <div className="comment">{data.length != 0 ? makeComment : <p>{t('nonCommentP')}</p>}</div>
  );
}

Comment.propTypes = {
  data: PropTypes.array,
};

export default Comment;
