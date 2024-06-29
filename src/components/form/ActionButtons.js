const ActionButtons = ({ perm, handleEdit, handleDelete }) => {


  return (
    <>
      <button
        className="btn btn-warning btn-sm"
        onClick={() => handleEdit(perm)}
        aria-label="Edit"
        title="Edit"
      >
        <i className="bi bi-pencil" />
      </button>
      <button
        className="btn btn-danger btn-sm"
        onClick={() => handleDelete(perm.id)}
        aria-label="Delete"
        title="Delete"
      >
        <i className="bi bi-trash"/>
      </button>
    </>
  );
};

export default ActionButtons;
