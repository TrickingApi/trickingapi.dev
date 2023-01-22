import React, { FunctionComponent, ReactNode, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons';
import styles from './Collapsible.module.scss';
// @ts-ignore
import { Inter } from '@next/font/google'

interface ICollapsibleProps {
  children: ReactNode;
  title: string;
};

const inter = Inter({ subsets: ['latin'] });

const Collapsible: FunctionComponent<ICollapsibleProps> = (props) => {
  const [open, setOpen] = useState(false);

  const toggleContent = () => {
    console.log('huhhhh');
    setOpen(!open);
  };

  return (
    <div className='collapsible-group'>
      <button className={styles.collapsible} onClick={toggleContent}>
        <div className={styles.collapsible_title}>
          <h3 className={inter.className}>{props.title}</h3>
        </div>
        <div className={`${styles.collapsible_icon}  ${!open && 'open'}`}>
          <FontAwesomeIcon icon={faChevronDown} />
        </div>
        <div className={`${styles.collapsible_icon} ${open && 'open'}`}>
          <FontAwesomeIcon icon={faChevronUp} />
        </div>
      </button>
      <div className={`${styles.collapse_content}  + ${open && 'active'}`}>{props.children}</div>
    </div>
  );
};

export default Collapsible;
