import React from 'react';
import styles from './styles.css';

export default function Stage({ children = [], virtual, onToggle }) {
  return (
    <div className={styles.root}>
      <div className={styles.header}>State Management Comparison <div className={styles.runner}></div></div>
      <div className={styles.options}>
        Virtual: <input type="checkbox" checked={virtual} onChange={onToggle} />
      </div>
      <div className={styles.contentWrapper}>
        {children}
      </div>
    </div>
  );
}
