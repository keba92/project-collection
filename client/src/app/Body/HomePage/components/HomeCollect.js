import React, { memo, useMemo, useState } from 'react';
import TableCollection from '../../UserPage/components/TableCollection';
import HomeShowResult from './HomeShowResult';
import PropTypes from 'prop-types';

function HomeCollect(props) {
  const { countEl, dataCollect, items } = props;
  const [collect, setCollect] = useState(null);
  const sortable = useMemo(
    () =>
      Object.keys(countEl)
        .map((keyName) => [keyName, countEl[keyName]])
        .sort((a, b) => a[1] - b[1]),
    [countEl],
  );
  const newSort = useMemo(() => sortable.map((el) => el[0]).reverse(), [sortable]);
  const newCollect = [];
  newSort.forEach((el, idx) => {
    const colect = dataCollect.find((elem) => elem._id == el);
    newCollect[idx] = colect;
  });
  const newItems = useMemo(() => items.filter((el) => el.idCollect == collect), [items, collect]);

  return (
    <div>
      <div id="items-collect">
        {collect && <HomeShowResult items={newItems} choiseTag={null} setChoiseTag={setCollect} />}
      </div>
      <TableCollection dataCollect={newCollect} setCollect={setCollect} />
    </div>
  );
}

HomeCollect.propTypes = {
  countEl: PropTypes.object,
  dataCollect: PropTypes.array,
  items: PropTypes.array,
};

export default memo(HomeCollect);
