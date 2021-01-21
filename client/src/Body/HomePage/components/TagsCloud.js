import React from 'react';
import { TagCloud } from 'react-tagcloud';

export default function TagsCloud(props) {
    const {setChoiseTag, items} = props;
    const customRenderer = (tag, size, color) => (
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
      )

    const itemsTag = items.map((el)=>el.tag);
    const countTag = itemsTag.flat().reduce((acc,el)=>{
              acc[el] = (acc[el] || 0) + 1;
              return acc;
          },{});
    const arrTags = Object.keys(countTag).map(el=>{
              return {
                  value: el,
                  count: countTag[el]
              }
          });
        
    return(<TagCloud tags={arrTags} minSize={3} maxSize={8} renderer={customRenderer} />)
}