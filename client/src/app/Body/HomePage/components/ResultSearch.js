import React, { memo } from 'react';
import { useTranslation } from 'react-i18next';
import PropTypes from 'prop-types';
import TabelItems from '../../UserPage/components/TableItems';

function ResultSearch(props) {
  const { data } = props;
  const { t, i18n } = useTranslation();

  return (
    <div id="result-block" className="result-search">
      {data.length != 0 && <h4>{t('resultSearchH')}</h4>}
      <TabelItems dataItems={data} idCollect="" />
    </div>
  );
}

ResultSearch.propTypes = {
  data: PropTypes.array,
};

export default memo(ResultSearch);
