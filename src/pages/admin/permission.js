import ConfirmDialog from "@/components/form/ConfirmDialog";
import FieldForm from "@/components/form/FieldForm";
import NavTitle from "@/components/menu/NavTitle";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import {
  createPermission,
  deletePermission,
  getPermissions,
  updatePermission,
} from "../../service/permissionService";

export default function Permission() {
  const [permission, setPermission] = useState({ name: "" });
  const [permissions, setPermissions] = useState([]);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    fetchPermissions();
  }, []);

  const fetchPermissions = async () => {
    try {
      const response = await getPermissions();
      setPermissions(response);
    } catch (error) {
      toast.error("Error fetching permissions");
      console.error("Error fetching permissions:", error);
    }
  };

  const handlePermission = (e) => {
    setPermission({
      ...permission,
      [e.target.name]: e.target.value,
    });
  };

  //methods to save, delete and update permission
  const savePermission = async (e) => {
    e.preventDefault();
    try {
      if (isEditing) {
        const response = await updatePermission(permission);
        setPermissions((prev) =>
          prev.map((perm) => (perm.id === response.id ? response : perm))
        );
        toast.success("Permission updated successfully");
      } else {
        const response = await createPermission(permission);
        setPermissions([...permissions, response]);
        toast.success("Permission created successfully");
      }
      setPermission({ name: "" });
      setIsEditing(false);
    } catch (error) {
      toast.error(
        isEditing ? "Error updating permission" : "Error creating permission"
      );
      console.error("Error creating permission:", error);
    }
  };

  const handleEdit = (perm) => {
    setPermission(perm);
    setIsEditing(true);
  };

  const handleDelete = (id) => {
    toast(
      <ConfirmDialog
        message="Are you sure you want to delete this permission?"
        onConfirm={async () => {
          try {
            await deletePermission(id);
            setPermissions((prevPermissions) =>
              prevPermissions.filter((perm) => perm.id !== id)
            );
            toast.success("Permission deleted successfully");
          } catch (error) {
            toast.error("Error deleting permission");
            console.error("Error deleting permission:", error);
          }
        }}
      />
    );
  };

  const buttonStyle = {
    width: "35px",
    height: "35px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  };

  return (
    <>
      <NavTitle
        icon={<i className="bi bi-file-earmark-lock2"></i>}
        title="Permissions"
        path={[
          { name: "Home", link: "/" },
          { name: "Permissions", link: "/admin/permissions" },
        ]}
      />
      <div className="container">
        <div className="card mt-5 p-3">
          <div className="card-header bg-light">
            <h3>Register</h3>
          </div>
          <div className="card-body">
            <div className="col-md-8">
              <FieldForm
                label="Name"
                name="name"
                type="text"
                value={permission.name}
                onChange={handlePermission}
              />
            </div>
            <div className="col-03 d-flex mt-3">
              <button
                className="btn btn-primary"
                type="button"
                onClick={savePermission}
              >
                {isEditing ? "Update" : "Submit"}
              </button>
            </div>
          </div>
          <div className="card-footer">
            <h5>Permissions List</h5>
            <table className="table">
              <thead>
                <tr>
                  <th scope="col">Name</th>
                  <th scope="col">Action</th>
                </tr>
              </thead>
              <tbody>
                {permissions.map((perm) => (
                  <tr key={perm.id}>
                    <td>{perm.name}</td>
                    <td
                      style={{
                        display: "flex",
                        gap: "10px",
                        justifyContent: "left",
                        alignItems: "center",
                      }}
                    >
                      <button
                        className="btn btn-warning btn-sm"
                        style={buttonStyle}
                        onClick={() => handleEdit(perm)}
                        aria-label="Edit"
                        title="Edit"
                      >
                        <i
                          className="bi bi-pencil"
                          style={{ fontSize: "18px" }}
                        />
                      </button>
                      <button
                        className="btn btn-danger btn-sm"
                        style={buttonStyle}
                        onClick={() => handleDelete(perm.id)}
                        aria-label="Delete"
                        title="Delete"
                      >
                        <i
                          className="bi bi-trash"
                          style={{ fontSize: "18px" }}
                        />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}
