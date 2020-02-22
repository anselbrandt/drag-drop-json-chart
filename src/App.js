import React, { useCallback, useState } from 'react';
import styles from './App.module.css';
import Dropzone from './Dropzone';
import Tree from './Tree';

function App() {
  const [data, setData] = useState();
  const [filename, setFilename] = useState();
  const [fileError, setFileError] = useState(false);

  const onDrop = useCallback(acceptedFiles => {
    acceptedFiles.forEach(file => {
      setFilename(file.name);
      const reader = new FileReader();
      reader.onabort = () => console.log('file reading was aborted');
      reader.onerror = () => console.log('file reading has failed');
      reader.onload = () => {
        const fileContents = reader.result;
        try {
          setData(JSON.parse(fileContents));
          setFileError(false);
        } catch (error) {
          setFileError(true);
          setData();
        }
      };
      reader.readAsText(file);
    });
  }, []);

  return (
    <div className={styles.app}>
      <div>
        {fileError ? `${filename} does not appear to contain valid JSON` : null}
      </div>
      <div className={styles.tree}>
        {data ? `${filename}: ${data.length} values` : null}
        <Tree data={data} />
      </div>
      <Dropzone onDrop={onDrop} />
    </div>
  );
}

export default App;
