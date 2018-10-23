import React from 'react';
import styles from './styles.css';

export default function Stage({ children = [] }) {
  return (
    <div className={styles.root}>
      <div className={styles.header}>State Management Comparison</div>
      <div className={styles.contentWrapper}>
        {children}
      </div>
    </div>
  );
}
