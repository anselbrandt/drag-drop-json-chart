import React from 'react';

export default function Tree(props) {
  const { element, data } = props;

  return (
    <React.Fragment>
      {element ? (
        <ul>
          {Object.keys(element).map((key, index) => (
            <li key={index}>
              {key}:{' '}
              {typeof Object.values(element)[index] === 'object' ? (
                <Tree element={Object.values(element)[index]} />
              ) : (
                `${Object.values(element)[index]}`
              )}
            </li>
          ))}
        </ul>
      ) : null}
    </React.Fragment>
  );
}
