import React, { memo, useMemo } from 'react';
import TableCollection from '../../UserPage/components/TableCollection';

function HomeCollect(props) {
    const { countEl, dataCollect } = props;
    const sortable = useMemo(()=>Object.keys(countEl)
        .map((keyName)=> [keyName, countEl[keyName]])
        .sort((a, b)=> a[1] - b[1]), [countEl]);
    const newSort = useMemo(()=>sortable.map(el=>el[0]).reverse(), [sortable]);
    const newCollect = [];
    newSort.forEach((el,idx)=>{
        const colect = dataCollect.find((elem)=>elem._id== el)
        newCollect[idx] = colect
    })

    return(<TableCollection dataCollect={newCollect}/>)
}

export default memo(HomeCollect);