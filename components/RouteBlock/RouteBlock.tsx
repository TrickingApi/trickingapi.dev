import React, { FunctionComponent } from 'react';

import styles from './RouteBlock.module.scss';

interface IRouteBlockProps {
  path: string;
  method: string;
  description: string;
  exampleRequest?: string;
  exampleResponse?: string;
}

const RouteBlock: FunctionComponent<IRouteBlockProps> = (props) => {
  return (
    <div className={styles.routeBlock}>
      <code>
        <h3>{props.path}</h3>
        <h4>{props.method}</h4>
      </code>
      <p>{props.description}</p>
    </div>
  );
}

export default RouteBlock;