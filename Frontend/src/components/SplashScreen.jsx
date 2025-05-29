import React, { useEffect, useState } from 'react';
import styles from '../styles/SplashScreen.module.css';

const SplashScreen = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prevProgress) => {
        if (prevProgress >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            onComplete();
          }, 500);
          return 100;
        }
        return prevProgress + 5;
      });
    }, 100);

    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <div className={styles.splashScreen}>
      <div className={styles.content}>
        <div className={styles.logo}>
          <span className={styles.logoText}>RIT</span>
          <span className={styles.logoTextSecondary}>Buddy</span>
        </div>
        <div className={styles.tagline}>Your AI Research Assistant</div>
        <div className={styles.progressContainer}>
          <div 
            className={styles.progressBar} 
            style={{ width: `${progress}%` }}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default SplashScreen;
