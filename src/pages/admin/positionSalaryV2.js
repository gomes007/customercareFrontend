import ConfirmDialog from "@/components/form/ConfirmDialog";
import FieldForm from "@/components/form/FieldForm";
import NavTitle from "@/components/menu/NavTitle";
import PageSizeSelector from "@/components/pagination/PageSizeSelector";
import Pagination from "@/components/pagination/Pagination";
import PaginationStats from "@/components/pagination/PaginationStats";
import positionSalaryService from "@/service/positionSalaryService";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import usePagination from "../../hooks/usePagination";
import { getRoles } from "../../service/roleService";

export default function PositionSalary() {
  const [roles, setRoles] = useState([]);
  const [formData, setFormData] = useState({
    position: "",
    salary: "",
    commission: "",
    roleId: "",
  });
  const router = useRouter();
  const { id } = router.query;

  const {
    data: positionSalaries,
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

  useEffect(() => {
    async function fetchRoles() {
      try {
        const rolesData = await getRoles();
        setRoles(rolesData.items);
        console.log("Roles set:", rolesData.items);
      } catch (error) {
        console.error("Error fetching roles:", error);
      }
    }
    fetchRoles();

    if (id) {
      async function fetchPositionSalary() {
        try {
          const data = await positionSalaryService.getPositionSalaryById(id);
          setFormData({
            position: data.position,
            salary: data.salary,
            commission: data.commission,
            roleId: data.role.id,
          });
        } catch (error) {
          console.error("Error fetching position salary:", error);
        }
      }
      fetchPositionSalary();
    }
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = {
      position: formData.position,
      salary: parseFloat(formData.salary),
      commission: parseFloat(formData.commission),
      role: { id: parseInt(formData.roleId) },
    };
    try {
      if (id) {
        await positionSalaryService.updatePositionSalary({ ...data, id });
        toast.success("Position Salary updated successfully");
      } else {
        await positionSalaryService.createPositionSalary(data);
        toast.success("Position Salary created successfully");
      }
      setFormData({
        position: "",
        salary: "",
        commission: "",
        roleId: "",
      });
      refreshPage();
    } catch (error) {
      console.error("Error creating/updating position salary:", error);
      toast.error("Error creating/updating position salary");
    }
  };

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
        ]}
      />

      <div className="container-fluid">
        <div className="card mt-5 p-3">
          <div className="card-header bg-light">
            <h5>Register</h5>
          </div>
          <div className="card-body">
            <div className="row">
              <div className="col-md-6">
                <FieldForm
                  label="Position"
                  type="text"
                  name="position"
                  value={formData.position}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="col-md-3">
                <FieldForm
                  label="Salary"
                  type="number"
                  name="salary"
                  value={formData.salary}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="col-md-3">
                <FieldForm
                  label="Commission"
                  type="number"
                  name="commission"
                  value={formData.commission}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
            <div className="row mt-3">
              <div className="form-group col-md-4">
                <label htmlFor="role">Role</label>
                <select
                  className="form-select"
                  name="roleId"
                  value={formData.roleId}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select a role</option>
                  {roles.length > 0 ? (
                    roles.map((role) => (
                      <option key={role.id} value={role.id}>
                        {role.name}
                      </option>
                    ))
                  ) : (
                    <option value="" disabled>
                      No roles available
                    </option>
                  )}
                </select>
              </div>
            </div>
            <div className="row mt-3">
              <div className="col-12 d-flex justify-content-end">
                <button
                  className="btn btn-primary"
                  type="button"
                  onClick={handleSubmit}
                >
                  {id ? "Update" : "Submit"}
                </button>
              </div>
            </div>
          </div>

          <div className="card-footer mt-5">
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
                {positionSalaries.map((ps) => (
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
          </div>
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
    </>
  );
}
