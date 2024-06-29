import ActionButtons from "@/components/form/ActionButtons";
import ConfirmDialog from "@/components/form/ConfirmDialog";
import Table from "@/components/form/Table";
import NavTitle from "@/components/menu/NavTitle";
import PageSizeSelector from "@/components/pagination/PageSizeSelector";
import Pagination from "@/components/pagination/Pagination";
import PaginationStats from "@/components/pagination/PaginationStats";
import {
  deleteRole,
  getRoles,
  getRolesByName,
  getRolesByPermissionName,
} from "@/service/roleService";
import { useRouter } from "next/router";
import { useState } from "react";
import { toast } from "react-toastify";
import usePagination from "../../hooks/usePagination";

export default function RoleList() {
  const {
    data: roles,
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
    setFilteredData,
  } = usePagination(getRoles);

  const [searchTerm, setSearchTerm] = useState("");
  const [searchBy, setSearchBy] = useState("name");
  const router = useRouter();

  const handleDelete = async (id) => {
    toast(
      <ConfirmDialog
        message="Are you sure you want to delete this role?"
        onConfirm={async () => {
          try {
            await deleteRole(id);
            toast.success("Role deleted successfully");
            refreshPage();
          } catch (error) {
            const message = error.message || "Failed to delete role";
            toast.error(message);
            console.error("Error deleting role:", error);
          }
        }}
      />
    );
  };

  const handleEdit = (role) => {
    router.push({
      pathname: "/admin/role",
      query: {
        id: role.id,
        name: role.name,
        permissions: JSON.stringify(role.permissions),
      },
    });
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    try {
      let response;
      if (searchBy === "name") {
        response = await getRolesByName(searchTerm, page, size);
      } else if (searchBy === "permission") {
        response = await getRolesByPermissionName(searchTerm, page, size);
      }
      setFilteredData(
        response.items,
        response.totalPages,
        response.totalRecordsQuantity
      );
    } catch (error) {
      console.error("Error searching roles:", error);
      toast.error("Failed to search roles");
    }
  };

  const handleClear = () => {
    setSearchTerm("");
    refreshPage();
  };

  const columns = ["Name", "Permissions", "Actions"];

  return (
    <>
      <NavTitle
        icon={<i className="bi bi-shield-check"></i>}
        title="Roles and Permissions"
        path={[
          { name: "Home", link: "/" },
          { name: "Roles", link: "/admin/role" },
          { name: "Roles List", link: "/admin/roleList" },
        ]}
      />
      <div className="container-fluid">
        <div className="card mt-5 p-3">
          <div className="card-header bg-light">
          <h6>Role list</h6>
            <form onSubmit={handleSearch}>
              <div className="form-row align-items-center">
                <div className="col-auto">
                  <select
                    className="form-select"
                    value={searchBy}
                    onChange={(e) => setSearchBy(e.target.value)}
                  >
                    <option value="name">Name</option>
                    <option value="permission">Permission</option>
                  </select>
                </div>
                <div className="col">
                  <input
                    type="text"
                    className="form-control"
                    placeholder={`Search by ${searchBy}`}
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                <div className="col-auto">
                  <button type="submit" className="btn btn-primary btn-sm" title='Search'>
                  <i className="bi bi-search"></i>
                  </button>
                </div>
                <div className="col-auto">
                  <button type="button" className="btn btn-secondary btn-sm" title='Clear' onClick={handleClear}>
                  <i className="bi bi-trash"></i>
                  </button>
                </div>
              </div>
            </form>
          </div>
          <div className="card-body">
            <Table
              columns={columns}
              data={roles}
              renderRow={(role, tdStyle) => (
                <>
                  <td>{role.name}</td>
                  <td>
                    {role.permissions
                      .map((permission) => permission.name)
                      .join(", ")}
                  </td>
                  <td style={tdStyle}>
                    <ActionButtons
                      perm={role}
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
