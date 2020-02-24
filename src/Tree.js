import React from 'react';
import styles from './App.module.css';

export default function Tree(props) {
  const { data, parent = [], handleOnClick } = props;

  return (
    <React.Fragment>
      {data ? (
        <ul>
          {Object.keys(data).map((key, index) => (
            <li key={index}>
              {key}:{' '}
              {typeof Object.values(data)[index] === 'object' ? (
                <Tree
                  data={Object.values(data)[index]}
                  parent={parent.length > 0 ? [...parent, key] : [key]}
                  handleOnClick={handleOnClick}
                />
              ) : parent.length > 0 ? (
                <button
                  onClick={handleOnClick}
                  value={[...parent, key]}
                  className={styles.value}
                >
                  {Object.values(data)[index]}
                </button>
              ) : (
                <button
                  onClick={handleOnClick}
                  value={[key]}
                  className={styles.value}
                >
                  {Object.values(data)[index]}
                </button>
              )}
            </li>
          ))}
        </ul>
      ) : null}
    </React.Fragment>
  );
}

// Object.values(data)[index]
