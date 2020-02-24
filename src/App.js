import React, { useCallback, useState, useEffect } from 'react';
import styles from './App.module.css';
import Dropzone from './Dropzone';
import Tree from './Tree';
import sample from './sample.json';
import geo from './geo.json';

function App() {
  const [data, setData] = useState();
  const [filename, setFilename] = useState();
  const [fileError, setFileError] = useState(false);
  const [selected, setSelected] = useState();
  const [numberDataPoints, setNumberDataPoints] = useState();

  useEffect(() => {
    if (data) {
      if (Array.isArray(data)) {
        setNumberDataPoints(data.length);
      } else {
        const values = Object.values(data);
        values.forEach(value => {
          if (Array.isArray(value)) setNumberDataPoints(value.length);
        });
      }
    }
  }, [data]);

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

  const handleUseSampleJSON = () => {
    setData(sample);
    setFilename('sample JSON');
  };

  const handleUseGeoJSON = () => {
    setData(geo);
    setFilename('GeoJSON');
  };

  const handleOnClick = event => {
    setSelected(event.target.value);
  };

  return (
    <div className={styles.app}>
      <div>
        {selected ? selected : null}
        {fileError ? `${filename} does not appear to contain valid JSON` : null}
      </div>
      <Dropzone onDrop={onDrop} />
      <div>
        <button onClick={handleUseSampleJSON} className={styles.button}>
          Use sample JSON
        </button>
        <button onClick={handleUseGeoJSON} className={styles.button}>
          Use sample GeoJSON
        </button>
      </div>
      <div className={styles.tree}>
        {data ? `${filename}: ${numberDataPoints} data points` : null}
        <Tree
          element={data ? data : null}
          data={data ? data : null}
          handleOnClick={handleOnClick}
        />
      </div>
    </div>
  );
}

export default App;
