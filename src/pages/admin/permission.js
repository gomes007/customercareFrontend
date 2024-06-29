import { useEffect, useState } from "react";
import { toast } from "react-toastify";

import ConfirmDialog from "@/components/form/ConfirmDialog";
import FieldForm from "@/components/form/FieldForm";
import NavTitle from "@/components/menu/NavTitle";

import {
  createPermission,
  deletePermission,
  getPermissions,
  updatePermission,
} from "../../service/permissionService";

import ActionButtons from "@/components/form/ActionButtons";
import Table from "@/components/form/Table";
import PageSizeSelector from "@/components/pagination/PageSizeSelector";
import Pagination from "@/components/pagination/Pagination";
import PaginationStats from "@/components/pagination/PaginationStats";
import usePagination from "../../hooks/usePagination";

export default function Permission() {
  // Hook pagination
  const {
    data,
    page,
    size,
    totalPages,
    totalRecords,
    goToFirstPage,
    goToPreviousPage,
    goToNextPage,
    goToLastPage,
    refreshPage,
    setPageSize,
  } = usePagination(getPermissions);

  // states
  const [permissions, setPermissions] = useState([]);
  const [permission, setPermission] = useState({ name: "" });
  const [isEditing, setIsEditing] = useState(false);


  useEffect(() => {
    setPermissions(data || []);
    console.log(data);
  },[data]);

  const handlePermission = (e) => {
    setPermission({
      ...permission,
      [e.target.name]: e.target.value,
    });
  };

  // Methods
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
      refreshPage();
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
            refreshPage();
          } catch (error) {
            const errorMessage = error.message || "Error deleting permission";
            toast.error(errorMessage);
            console.error("Error deleting permission:", error);
          }
        }}
      />
    );
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
      <div className="container-fluid">
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
            <Table
              columns={["Name", "Action"]}
              data={permissions}
              renderRow={(perm, tdStyle) => (
                <>
                  <td>{perm.name}</td>
                  <td style={tdStyle}>
                    <ActionButtons
                      perm={perm}
                      handleEdit={handleEdit}
                      handleDelete={handleDelete}
                    />
                  </td>
                </>
              )}
            />
            <div className="pagination-container">
              <div className="pagination-row">
                <Pagination
                  page={page}
                  totalPages={totalPages}
                  goToFirstPage={goToFirstPage}
                  goToPreviousPage={goToPreviousPage}
                  goToNextPage={goToNextPage}
                  goToLastPage={goToLastPage}
                />
                <PageSizeSelector size={size} setPageSize={setPageSize} />
              </div>
              <PaginationStats
                page={page}
                totalPages={totalPages}
                totalRecords={totalRecords}
                className="pagination-stats"
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
