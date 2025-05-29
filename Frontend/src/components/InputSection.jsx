import React, { useRef, useEffect } from 'react';
import styles from '../styles/InputSection.module.css';

const InputSection = ({ input, setInput, handleSendMessage, isLoading }) => {
  const textareaRef = useRef(null);
  
  // Auto-resize the textarea based on content
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = '0px';
      const scrollHeight = textareaRef.current.scrollHeight;
      textareaRef.current.style.height = Math.min(scrollHeight, 120) + 'px';
    }
  }, [input]);
  
  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className={styles.inputSection}>
      <div className={styles.inputContainer}>
        <textarea
          ref={textareaRef}
          className={styles.inputField}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Ask me anything..."
          rows={1}
          disabled={isLoading}
        />
        <button 
          className={styles.sendButton} 
          onClick={handleSendMessage}
          disabled={isLoading || input.trim() === ''}
          aria-label="Send message"
        >
          {isLoading ? (
            <div className={styles.loadingDots}>
              <span></span>
              <span></span>
              <span></span>
            </div>
          ) : (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M22 2L11 13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M22 2L15 22L11 13L2 9L22 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          )}
        </button>
      </div>
      <div className={styles.inputFooter}>
        <span className={styles.hint}>Press Enter to send, Shift+Enter for new line</span>
      </div>
    </div>
  );
};

export default InputSection;
