import React, { useCallback, useState } from 'react';
import styles from './App.module.css';
import Dropzone from './Dropzone';
import Tree from './Tree';
import sampledata from './sampledata.json';

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

  const handleUseSampleData = () => setData(sampledata);

  return (
    <div className={styles.app}>
      <div>
        {fileError ? `${filename} does not appear to contain valid JSON` : null}
      </div>
      <div className={styles.tree}>
        {data ? `${filename}: ${data.length} values` : null}
        <Tree element={data ? data[3] : null} data={data ? data : null} />
      </div>
      <Dropzone onDrop={onDrop} />
      <div>
        <button onClick={handleUseSampleData} className={styles.button}>
          Use sample data
        </button>
      </div>
    </div>
  );
}

export default App;
