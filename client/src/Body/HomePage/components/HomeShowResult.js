import React, { memo } from 'react';
import ResultSearch from './ResultSearch';
import { Button } from 'react-bootstrap';

function HomeShowResult(props) {
    const { items, choiseTag, setChoiseTag } = props;
    const tegsItems=[];
    items.forEach((el) =>{
        if(el.tag.includes(choiseTag)) tegsItems.push(el);
    })

    return (
        (tegsItems)&&(
        <div>
            <Button variant="danger" 
                    style={{float:'right'}} 
                    onClick={()=>setChoiseTag(null)}>
                    Close
            </Button>
            <ResultSearch data={tegsItems}/>
        </div>)
    )
}

export default memo(HomeShowResult);