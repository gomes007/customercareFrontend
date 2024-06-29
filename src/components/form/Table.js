export default function Table({ columns, data, renderRow }) {
  const tdStyle = {
    display: "flex",
    gap: "10px",
    justifyContent: "left",
    alignItems: "center",
  };

  return (
    <div className="table-responsive">
      <table className="table table-striped table-sm align-middle table-bordered">
        <thead>
          <tr>
            {columns.map((column, index) => (
              <th key={index}>{column}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr key={index}>
              {renderRow(item, tdStyle)}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
