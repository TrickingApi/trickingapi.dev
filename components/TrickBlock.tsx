import React, { FunctionComponent } from 'react';
import { Trick } from '@trickingapi/tricking-ts';
import JsonViewer from './JSONViewer/JSONViewer';

interface ITrickBlockProps {
  trick: Trick;
}
const TrickBlock: FunctionComponent<ITrickBlockProps> = (props) => {
  return (
    <JsonViewer data={props.trick}/>
  );
}

export default TrickBlock;