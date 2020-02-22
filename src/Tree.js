import React from 'react';

export default function Tree(props) {
  const { data } = props;
  return (
    <React.Fragment>
      {data ? (
        <ul>
          {Object.keys(data).map((key, index) => (
            <li key={index}>
              {key}:{' '}
              {typeof Object.values(data)[index] === 'object' ? (
                <Tree data={Object.values(data)[index]} />
              ) : (
                `${Object.values(data)[index]}`
              )}
            </li>
          ))}
        </ul>
      ) : null}
    </React.Fragment>
  );
}
