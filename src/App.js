import React, { useCallback, useState } from 'react';
import styles from './App.module.css';
import Dropzone from './Dropzone';

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
      <div>{data ? `${filename}: ${data.length} values` : null}</div>
      <div>
        <ul>
          {data
            ? Object.keys(data[0]).map((key, index) => (
                <li key={index}>
                  {key} {Object.keys(key) ? 'has more' : null}
                </li>
              ))
            : null}
        </ul>
      </div>
      <Dropzone onDrop={onDrop} />
    </div>
  );
}

export default App;
