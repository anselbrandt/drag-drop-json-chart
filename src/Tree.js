import React from 'react';
import styles from './App.module.css';

export default function Tree(props) {
  const { element, data, parent, handleOnClick } = props;

  return (
    <React.Fragment>
      {element ? (
        <ul>
          {Object.keys(element).map((key, index) => (
            <li key={index}>
              {key}:{' '}
              {typeof Object.values(element)[index] === 'object' ? (
                <Tree
                  element={Object.values(element)[index]}
                  parent={key}
                  handleOnClick={handleOnClick}
                />
              ) : parent ? (
                <button
                  onClick={handleOnClick}
                  value={`element.${parent}.${key}`}
                  className={styles.value}
                >
                  {Object.values(element)[index]}
                </button>
              ) : (
                <button
                  onClick={handleOnClick}
                  value={`element.${key}`}
                  className={styles.value}
                >
                  {Object.values(element)[index]}
                </button>
              )}
            </li>
          ))}
        </ul>
      ) : null}
    </React.Fragment>
  );
}

// Object.values(element)[index]
