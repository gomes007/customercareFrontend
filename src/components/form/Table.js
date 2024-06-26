export default function Table({ columns, data, renderRow }) {
  const tdStyle = {
    display: "flex",
    gap: "10px",
    justifyContent: "left",
    alignItems: "center",
  };

  const trStyle = {
    height: "50px"
  };

  return (
    <table className="table table-striped">
      <thead>
        <tr>
          {columns.map((column, index) => (
            <th key={index}>{column}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((item, index) => (
          <tr key={index} style={trStyle}>
            {renderRow(item, tdStyle)}
          </tr>
        ))}
      </tbody>
    </table>
  );
}
