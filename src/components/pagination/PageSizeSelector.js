
import React from 'react';

const PageSizeSelector = ({ size, setPageSize }) => {
  const handlePageSizeChange = (e) => {
    const newSize = parseInt(e.target.value, 10);
    setPageSize(newSize);
  };

  const containerStyle = {
    gap: '0.5rem',
    whiteSpace: 'nowrap', 
  };

  const labelStyle = {
    marginBottom: '0',
    fontSize: '14px'
  };

  return (
    <div style={containerStyle}>
      <label htmlFor="pageSize" style={labelStyle}>Page Size:</label>
      <select
        id="pageSize"
        value={size}
        onChange={handlePageSizeChange}
        className="form-select form-select-sm"
      >
        <option value={5}>5</option>
        <option value={10}>10</option>
        <option value={20}>20</option>
      </select>
    </div>
  );
};

export default PageSizeSelector;
