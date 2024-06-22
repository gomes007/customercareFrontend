
const ActionButtons = ({ perm, handleEdit, handleDelete }) => {

    const buttonStyle = {
        width: "35px",
        height: "35px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
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
        <i className="bi bi-pencil" style={{ fontSize: "18px" }} />
      </button>
      <button
        className="btn btn-danger btn-sm"
        style={buttonStyle}
        onClick={() => handleDelete(perm.id)}
        aria-label="Delete"
        title="Delete"
      >
        <i className="bi bi-trash" style={{ fontSize: "18px" }} />
      </button>
    </>
  );
};

export default ActionButtons;
