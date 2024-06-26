import ActionButtons from "@/components/form/ActionButtons";
import ConfirmDialog from "@/components/form/ConfirmDialog";
import Table from "@/components/form/Table";
import NavTitle from "@/components/menu/NavTitle";
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

  const columns = ["Name", "Permissions", "Actions"];

  return (
    <>
      <NavTitle
        icon={<i className="bi bi-file-earmark-lock2"></i>}
        title="Roles and Permissions"
        path={[
          { name: "Home", link: "/" },
          { name: "Roles", link: "/admin/role" },
          { name: "Roles List", link: "/admin/roleList" },
        ]}
      />
      <div className="container">
        <div className="card mt-5 p-3">
          <div className="card-header bg-light">
            <h5>Roles List</h5>
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
