import React, { memo, useCallback, useMemo } from 'react';
import { TagCloud } from 'react-tagcloud';

function TagsCloud(props) {
    const {setChoiseTag, items} = props;
    const customRenderer = useCallback((tag, size, color) => (
        <span
          key={tag.value}
          style={{
            animation: 'blinker 3s linear infinite',
            animationDelay: `${Math.random() * 2}s`,
            fontSize: `${size / 2}em`,
            margin: '3px',
            display: 'inline-block',
          }}
          > 
          <p style={{cursor: 'pointer', color: `${color}`}} onClick={(e)=>setChoiseTag(e.target.innerHTML)}>{tag.value}</p> 
          </span>
      ), [setChoiseTag])

    const itemsTag = useMemo(()=>items.map((el)=>el.tag),[items]);
    const countTag = useMemo(()=>itemsTag.flat().reduce((acc,el)=>{
              acc[el] = (acc[el] || 0) + 1;
              return acc;
    },{}),[itemsTag]);
    const arrTags = useMemo(()=>Object.keys(countTag).map(el=>{
              return {
                  value: el,
                  count: countTag[el]
              }
    }),[countTag]);
        
    return(<TagCloud tags={arrTags} minSize={3} maxSize={8} renderer={customRenderer} />)
}

export default memo(TagsCloud);