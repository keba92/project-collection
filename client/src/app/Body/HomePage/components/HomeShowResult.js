import React, { memo, useMemo } from 'react';
import ResultSearch from './ResultSearch';
import { Button } from 'react-bootstrap';

function HomeShowResult(props) {
    const { items, choiseTag, setChoiseTag } = props;
    const tegsItems= useMemo(()=>items.filter((el) => el.tag.includes(choiseTag)),[items, choiseTag]);

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