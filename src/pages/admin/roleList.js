import PageSizeSelector from "@/components/pagination/PageSizeSelector";
import Pagination from "@/components/pagination/Pagination";
import PaginationStats from "@/components/pagination/PaginationStats";
import { deleteRole, getRoles } from "@/service/roleService";
import { useRouter } from "next/router";
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
  } = usePagination(getRoles);

  const router = useRouter();

  const handleDelete = async (id) => {
    try {
      await deleteRole(id);
      toast.success("Role deleted successfully");
      refreshPage();
    } catch (error) {
      console.error("Error deleting role:", error);
      toast.error("Failed to delete role");
    }
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

  return (
    <div className="container">
      <h3>Roles</h3>
      <table className="table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Permissions</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {roles.map((role) => (
            <tr key={role.id}>
              <td>{role.name}</td>
              <td>
                {role.permissions
                  .map((permission) => permission.name)
                  .join(", ")}
              </td>
              <td>
                <button
                  className="btn btn-warning"
                  onClick={() => handleEdit(role)}
                >
                  Edit
                </button>
                <button
                  className="btn btn-danger"
                  onClick={() => handleDelete(role.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
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
  );
}
