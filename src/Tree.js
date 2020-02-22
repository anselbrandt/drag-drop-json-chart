import React from 'react';

export default function Tree(props) {
  const { data } = props;
  return (
    <ul>
      {data
        ? Object.keys(data[0]).map((key, index) => (
            <li key={index}>
              {key} {Object.keys(key) ? 'has more' : null}
            </li>
          ))
        : null}
    </ul>
  );
}
