import React from 'react';
import TableCollection from '../../UserPage/components/TableCollection';

export default function HomeCollect(props) {
    const { countEl, dataCollect } = props;
    const sortable = [];
        for (const cont in countEl) {
            sortable.push([cont, countEl[cont]]);
        }
        sortable.sort((a, b)=> {
            return a[1] - b[1];
        });
        const newSort = sortable.map(el=>el[0]).reverse();
        const newCollect = [];
        newSort.forEach((el,idx)=>{
            const colect = dataCollect.find((elem)=>{
                if(elem._id== el) return elem;
            })
            newCollect[idx] = colect
        })

    return(<TableCollection dataCollect={newCollect}/>)
}