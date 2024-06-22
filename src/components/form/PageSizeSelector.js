
const PageSizeSelector = ({ size, setPageSize }) => {
  const handlePageSizeChange = (e) => {
    const newSize = parseInt(e.target.value, 10);
    setPageSize(newSize);
  };

  return (
    <div>
      <label htmlFor="pageSize" className="mb-0">Page Size:</label>
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
