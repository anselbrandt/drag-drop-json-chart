import React, { useCallback } from 'react';
import styles from './App.module.css';
import Dropzone from './Dropzone';

function App() {
  const onDrop = useCallback(acceptedFiles => {
    acceptedFiles.forEach(file => {
      console.log(file.name);
      const reader = new FileReader();
      reader.onabort = () => console.log('file reading was aborted');
      reader.onerror = () => console.log('file reading has failed');
      reader.onload = () => {
        // Do whatever you want with the file contents
        const binaryStr = reader.result;
        console.log(binaryStr);
      };
      reader.readAsText(file);
    });
  }, []);

  return (
    <div className={styles.app}>
      <Dropzone onDrop={onDrop} />
    </div>
  );
}

export default App;
