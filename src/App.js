import React from 'react';
import styles from './App.module.css';
import Dropzone from './Dropzone';

function App() {
  return (
    <div className={styles.app}>
      <Dropzone />
    </div>
  );
}

export default App;
