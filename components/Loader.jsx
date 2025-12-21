import React from 'react';

const Loader = ({ color, size, inline }) => {
  return (
    <span className={`text-center ${!inline ? 'block' : 'mx-2'} ${color}`}>
      <div className={`spinner-border ${size ? 'spinner-border-sm' : ''}`} role='status'></div>
    </span>
  );
};

export default Loader;