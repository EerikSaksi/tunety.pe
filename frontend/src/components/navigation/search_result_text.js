import React from 'react';
export default function SearchResultText({ text, style }) {
  return (
    <div
      style={{
        position: 'absolute',
        height: 30,
        opacity: 0.8,
        textOverflow: 'ellipsis',
        width: '100%',
        display: 'flex',
        backgroundColor: 'white',
        overflowY: 'none',
        ...style,
      }}
    >
      <p
        style={{
          alignSelf: 'center',
          width: '100%',
          textOverflow: 'ellipsis',
          color: 'black',
          fontSize: 20,
          margin: 0,
        }}
      >
        {text}
      </p>
    </div>
  );
}
