import React, { memo } from 'react';
import { Card } from 'react-bootstrap';
import { MarkdownPreview } from 'react-marked-markdown';
import Tag from '@uiw/react-tag';

function ItemBody(props) {
  const { data, pole, el } = props;

  return (
    <Card.Body>
      {Object.keys(data).map((keyName, idx) => {
        if (keyName == 'name') {
          return <Card.Title>{data[keyName]}</Card.Title>;
        }
        // eslint-disable-next-line default-case
        switch (pole[keyName]) {
          case 'number':
            return <Card.Text key={idx}>{`${keyName}: ${data[keyName]}`}</Card.Text>;
          case 'text':
            return <Card.Text key={idx}>{`${keyName}: ${data[keyName]}`}</Card.Text>;
          case 'textarea':
            return <MarkdownPreview value={data[keyName]} />;
          case 'date':
            return <Card.Text key={idx}>{`${keyName}: ${data[keyName]}`}</Card.Text>;
          case 'checkbox':
            return <Card.Text key={idx}>{`${keyName}: ${data[keyName] ? 'Да' : 'Нет'}`}</Card.Text>;
        }
      })}
      {el.tag.map((teg, indx) => {
        return (
          <Tag key={`${indx}`} light disabled color="rgb(41, 178, 128)">
            {teg}
          </Tag>
        );
      })}
    </Card.Body>
  );
}

export default memo(ItemBody);
