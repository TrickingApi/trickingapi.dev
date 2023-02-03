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
    setOpen(!open);
  };

  return (
    <div className={styles.collapsible_group}>
      <button className={styles.collapsible} onClick={toggleContent}>
        <div className={styles.collapsible_title}>
          <h3 className={inter.className}>{props.title}</h3>
        </div>
        <div className={`${styles.collapsible_icon}  ${!open && styles.open}`}>
          <FontAwesomeIcon icon={faChevronDown} />
        </div>
        <div className={`${styles.collapsible_icon} ${open && styles.open}`}>
          <FontAwesomeIcon icon={faChevronUp} />
        </div>
      </button>
      <div className={`${styles.collapse_content}  ${open && styles.active}`}>{props.children}</div>
    </div>
  );
};

export default Collapsible;
