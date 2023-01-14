import React from 'react';

import styles from './LinkButton.module.scss';

const LinkButton = ({className, ...props}: any ) => (
    <button className={styles.linkbutton + ' ' + className} {...props}/>
);

export default LinkButton;
