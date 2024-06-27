const ActionButtons = ({ perm, handleEdit, handleDelete }) => {
  const buttonStyle = {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "5px",
  
  };

  const iconStyle = {
    fontSize: "15px",
  };

  return (
    <>
      <button
        className="btn btn-warning btn-sm"
        style={buttonStyle}
        onClick={() => handleEdit(perm)}
        aria-label="Edit"
        title="Edit"
      >
        <i className="bi bi-pencil" style={iconStyle} />
      </button>
      <button
        className="btn btn-danger btn-sm"
        style={buttonStyle}
        onClick={() => handleDelete(perm.id)}
        aria-label="Delete"
        title="Delete"
      >
        <i className="bi bi-trash" style={iconStyle} />
      </button>
    </>
  );
};

export default ActionButtons;
