import React from 'react';
import TabelItems from './TableItems';

const ResultSearch = (props) => {
  const { data } = props;
  return (
     <div>
        {(data.length!=0)&&(<h4>Результаты поиска</h4>)}
        <TabelItems dataItems={data} idCollect=''/>
     </div>
  )
}

export default ResultSearch