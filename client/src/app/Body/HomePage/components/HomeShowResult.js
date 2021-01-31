import React, { memo, useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import ResultSearch from './ResultSearch';
import PropTypes from 'prop-types';

function HomeShowResult(props) {
  const { items, choiseTag, setChoiseTag } = props;
  const [itemsInfo, setItemsInfo] = useState(null);

  useEffect(() => {
    if (choiseTag) {
      const tegsItems = items.filter((el) => el.tag.includes(choiseTag));
      setItemsInfo(tegsItems);
    } else {
      setItemsInfo(items);
    }
  }, []);

  return (
    itemsInfo && (
      <div>
        <Button
          variant="danger"
          style={{ float: 'right' }}
          onClick={() => {
            setChoiseTag(null);
          }}
        >
          Close
        </Button>
        <ResultSearch data={itemsInfo} />
      </div>
    )
  );
}

HomeShowResult.propTypes = {
  items: PropTypes.array,
  choiseTag: PropTypes.string,
  setChoiseTag: PropTypes.func,
};

export default memo(HomeShowResult);
