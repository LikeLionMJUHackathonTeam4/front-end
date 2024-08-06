
import React from 'react';

const ToiletList = ({ toilets }) => {
  return (
    <div>
      <h1>공중 화장실 목록</h1>
      <ul>
        {toilets.map(toilet => (
          <li key={toilet.id}>
            <strong>구역:</strong> {toilet.district} <br/>
            <strong>타입:</strong> {toilet.type} <br/>
            <strong>위치:</strong> {toilet.location}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ToiletList;
