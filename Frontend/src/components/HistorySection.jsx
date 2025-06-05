import React from 'react';
import HistoryItem from './HistoryItem';
import styles from '../styles/HistorySection.module.css';

const HistorySection = ({ history, handleHistoryClick, handleClearChat }) => {
  return (
    <div className={styles.historySection}>
      <div className={styles.historyItems}>
        {history.length === 0 ? (
          <div className={styles.emptyHistory}>
            <p>No history yet</p>
          </div>
        ) : (
          history.map((item, index) => (
            <HistoryItem 
              key={index} 
              prompt={item} 
              onClick={() => handleHistoryClick(item)} 
            />
          ))
        )}
      </div>
      <button 
        className={styles.clearButton} 
        onClick={handleClearChat}
        disabled={history.length === 0}
      >
        Clear Chat
      </button>
    </div>
  );
};

export default HistorySection;