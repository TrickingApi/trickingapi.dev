import React, { FunctionComponent, ReactNode, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { solid } from '@fortawesome/fontawesome-svg-core/import.macro';
import styles from './Collapsible.module.scss';
// @ts-ignore
import { Inter } from '@next/font/google'

type CollapsibleProps = {
  children: ReactNode;
  title: string;
};

const inter = Inter({ subsets: ['latin'] });

const Collapsible: FunctionComponent<CollapsibleProps> = (props) => {
  const [open, setOpen] = useState(false);

  const toggleContent = () => {
    setOpen(!open);
  };

  return (
    <div className='collapsible-group'>
      <button className={styles.collapsible} onClick={toggleContent}>
        <div className={styles.collapsible_title}>
          <h3 className={inter.className}>{props.title}</h3>
        </div>
        <div className={`${styles.collapsible_icon}  ${!open && 'open'}`}>
          <FontAwesomeIcon icon={solid('chevron-down')} />
        </div>
        <div className={`${styles.collapsible_icon} ${open && 'open'}`}>
          <FontAwesomeIcon icon={solid('chevron-up')} />
        </div>
      </button>
      <div className={`${styles.collapse_content}  + ${open && 'active'}`}>{props.children}</div>
    </div>
  );
};

export default Collapsible;
