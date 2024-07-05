import FieldForm from "@/components/form/FieldForm";
import NavTitle from "@/components/menu/NavTitle";
import positionSalaryService from "@/service/positionSalaryService";
import { useRouter } from 'next/router';
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
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
        router.push("/admin/positionSalaryTable");
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
      
    } catch (error) {
      console.error('Error creating/updating position salary:', error);
      toast.error("Error creating/updating position salary");
    }
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

      <div className="container-fluid">
        <div className="card mt-5 p-3">
          <div className="card-header bg-light">
            <h5>{id ? "Edit" : "Register"}</h5>
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
                <label htmlFor="role" className="form-label small mb-0">Role</label>
                <select
                  className="form-select form-select-sm"
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
      </div>
    </>
  );
}
