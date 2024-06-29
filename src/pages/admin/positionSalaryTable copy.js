import ConfirmDialog from "@/components/form/ConfirmDialog";
import NavTitle from "@/components/menu/NavTitle";
import PageSizeSelector from "@/components/pagination/PageSizeSelector";
import Pagination from "@/components/pagination/Pagination";
import PaginationStats from "@/components/pagination/PaginationStats";
import positionSalaryService from "@/service/positionSalaryService";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import usePagination from "../../hooks/usePagination";

export default function PositionSalaryTable() {
  const {
    data: positionSalary,
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
  } = usePagination(positionSalaryService.getPositionSalaries);

  const router = useRouter();

  const handleEdit = (id) => {
    router.push(`/admin/positionSalary?id=${id}`);
  };

  const handleDelete = async (id) => {
    toast(
      <ConfirmDialog
        message="Are you sure you want to delete this role?"
        onConfirm={async () => {
          try {
            await positionSalaryService.deletePositionSalary(id);
            refreshPage();
            toast.success("Role deleted successfully");
          } catch (error) {
            const message = error.message || "Failed to delete role";
            toast.error(message);
            console.error("Error deleting role:", error);
          }
        }}
      />
    );
  };

  return (
    <>
    <NavTitle
        icon={<i className="bi bi-currency-dollar"></i>}
        title="Position Salaries"
        path={[
          { name: "Home", link: "/" },
          { name: "Position Salaries", link: "/admin/positionSalary" },
          { name: "Position Salaries List", link: "/admin/positionSalaryTable" },
        ]}
      />
    <div className="card-footer">
      <div className="table-title">Position Salaries List</div>
      <table className="table table-striped table-sm align-middle table-bordered">
        <thead>
          <tr>
            <th>Position</th>
            <th>Salary</th>
            <th>Commission</th>
            <th>Role</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {positionSalary.map((ps) => (
            <tr key={ps.id}>
              <td>{ps.position}</td>
              <td>{ps.salary}</td>
              <td>{ps.commission}</td>
              <td>{ps.roleName}</td>
              <td>
              <button
                        className="btn btn-warning btn-sm me-2"
                        title="Edit"
                        onClick={() => handleEdit(ps.id)}
                      >
                        <i className="bi bi-pencil"></i>
                      </button>
                      <button
                        className="btn btn-danger btn-sm"
                        title="Delete"
                        onClick={() => handleDelete(ps.id)}
                      >
                        <i className="bi bi-trash"></i>
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
    </>
  );
}
