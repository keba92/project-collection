import React from 'react';
import TabelItems from '../../UserPage/components/TableItems';
import { useTranslation } from 'react-i18next';

const ResultSearch = (props) => {
  const { data } = props;
  const { t, i18n } = useTranslation();

  return (
     <div>
        {(data.length!=0)&&(<h4>{t('resultSearchH')}</h4>)}
        <TabelItems dataItems={data} idCollect=''/>
     </div>
  )
}

export default ResultSearch