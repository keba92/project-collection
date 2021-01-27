import React, { memo, useEffect, useState } from 'react';
import ResultSearch from './ResultSearch';
import { Button } from 'react-bootstrap';

function HomeShowResult(props) {
    const { items, choiseTag, setChoiseTag } = props;
    const [itemsInfo, setItemsInfo]= useState(null);

    useEffect(()=>{
        if(choiseTag) {
            const tegsItems=items.filter((el) =>el.tag.includes(choiseTag));
            setItemsInfo(tegsItems);
        } else {
            setItemsInfo(items);
        }
    },[])

    return (
        (itemsInfo)&&(
        <div>
            <Button variant="danger" 
                    style={{float:'right'}} 
                    onClick={()=>{
                        setChoiseTag(null);
                    }}>
                    Close
            </Button>
            <ResultSearch data={itemsInfo}/>
        </div>)
    )
}

export default memo(HomeShowResult);