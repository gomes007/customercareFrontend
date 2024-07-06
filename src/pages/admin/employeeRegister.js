import FieldForm from "@/components/form/FieldForm";
import NavTitle from "@/components/menu/NavTitle";
import employeeService from "@/service/employeeService";
import positionSalaryService from "@/service/positionSalaryService";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

export default function EmployeeRegister() {
  const [employee, setEmployee] = useState({
    name: "",
    gender: "",
    cpf: "",
    phone: "",
    birthDate: "",
    hireDate: "",
    privateEmail: "",
    companyEmail: "",
    hasDependents: false,
    positionSalaryId: "",
    otherInformation: "",    
  });
  const [profileImage, setProfileImage] = useState(null);
  const [positions, setPositions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchPositionSalary() {
      try {
        const data = await positionSalaryService.getPositionSalaries();
        setPositions(data.items);
        
      } catch (error) {
        console.error("Error fetching position salary:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchPositionSalary();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEmployee((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setProfileImage(e.target.files[0]);
    }
  };
  

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const employeeData = {
      ...employee,
      positionSalary: { id: parseInt(employee.positionSalaryId) },
    };
      
    delete employeeData.positionSalaryId;
    
    try {
      const photo = document.getElementById("imageUpload").files[0];
      const files = { photo };  
      await employeeService.createEmployee(employeeData, files);
      toast.success("Employee created successfully");
    } catch (error) {
      console.error("Error creating employee:", error);
      toast.error("Failed to create employee");
    }
  };
    
  
  


  return (
    <>
      <NavTitle
        icon={<i className="bi bi-person"></i>}
        title="Employees"
        path={[
          { name: "Home", link: "/" },
          { name: "Employees", link: "/admin/employee" },
          { name: "Employee List", link: "/admin/employeeTable" },
        ]}
      />

      <div className="container-fluid">
        <div className="card mt-4 p-3">
          <div className="card-header">
            <h6>Register</h6>
          </div>
          <div className="card-body">
            <legend>Personal Information</legend>
            <div className="row">
              <div className="col-md-10">
                <div className="row">
                  <div className="col-md-6">
                    <FieldForm
                      label="Name"
                      type="text"
                      name="name"
                      value={employee.name}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="col-md-3">
                    <FieldForm
                      label="Gender"
                      type="select"
                      id="gender"
                      name="gender"
                      value={employee.gender}
                      onChange={handleChange}
                      options={[
                        { value: "MALE", label: "Male" },
                        { value: "FEMALE", label: "Female" },
                      ]}
                    />
                  </div>
                  <div className="col-md-3">
                    <FieldForm
                      label="CPF"
                      type="text"
                      name="cpf"
                      value={employee.cpf}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="col-md-3 mt-3">
                    <FieldForm
                      label="Birth Date"
                      type="date"
                      name="birthDate"
                      value={employee.birthDate}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="col-md-3 mt-3">
                    <FieldForm
                      label="Phone"
                      type="number"
                      name="phone"
                      value={employee.phone}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="col-md-6 mt-3">
                    <FieldForm
                      label="Private Email"
                      type="text"
                      name="privateEmail"
                      value={employee.privateEmail}
                      onChange={handleChange}
                    />
                  </div>
                </div>
              </div>
              <div className="col-md-2 d-flex flex-column align-items-center">
                <div className="profile-image-wrapper">
                  <div className="image-container">
                    {profileImage ? (
                      <img
                        src={profileImage}
                        alt="Profile"
                        className="profile-image"
                      />
                    ) : (
                      <div className="image-placeholder">Upload Image</div>
                    )}
                  </div>
                  <label htmlFor="imageUpload" className="custom-upload-button">
                    Choose Image
                  </label>
                  <input
                    id="imageUpload"
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="image-upload"
                  />
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-md-3 mt-3">
                <FieldForm
                  label="Hire Date"
                  type="date"
                  name="hireDate"
                  value={employee.hireDate}
                  onChange={handleChange}
                />
              </div>
              <div className="col-md-5 mt-3">
                <FieldForm
                  label="Company Email"
                  type="text"
                  name="companyEmail"
                  value={employee.companyEmail}
                  onChange={handleChange}
                />
              </div>

              <div className="col-md-4 mt-3">
                <label htmlFor="position" className="form-label small mb-0">
                  Position
                </label>
                <select
                  className="form-select form-select-sm"
                  name="positionSalaryId"
                  value={employee.positionSalaryId}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select a Position</option>
                  {loading ? (
                    <option value="" disabled>
                      Loading...
                    </option>
                  ) : positions.length > 0 ? (
                    positions.map((position) => (
                      <option key={position.id} value={position.id}>
                        {position.position}
                      </option>
                    ))
                  ) : (
                    <option value="" disabled>
                      No roles available
                    </option>
                  )}
                </select>
              </div>
              <div className="col-md-12 mt-3">
                <FieldForm
                  label="Other Information"
                  type="textarea"
                  name="otherInformation"
                  rows={3}
                  value={employee.otherInformation}
                  onChange={handleChange}
                />
              </div>
              <div className="col-md-12 mt-3">
              <div className="form-check form-switch">
                <input
                  className="form-check-input"
                  type="checkbox"
                  role="switch"
                  id="flexSwitchCheckChecked"
                  name="hasDependents"
                  checked={employee.hasDependents}
                  onChange={(e) =>
                    setEmployee((prev) => ({
                      ...prev,
                      hasDependents: e.target.checked,
                    }))
                  }
                />
                <label
                  className="form-check-label small"
                  htmlFor="flexSwitchCheckChecked"
                >
                  Has Dependents?
                </label>
              </div>
              </div>
            </div>
            <div className="row mt-3">
              <div className="col-12 d-flex justify-content-end">
                <button className="btn btn-primary" onClick={handleSubmit}>
                  Submit
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .profile-image-wrapper {
          display: flex;
          flex-direction: column;
          align-items: center;
          margin-top: 23px;
          position: relative;
        }
        .image-container {
          width: 105px;
          height: 105px;
          border: 1px solid #ccc;
          border-radius: 5%;
          overflow: hidden;
          margin-bottom: 5px;
          position: relative;
        }
        .profile-image {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
        .image-placeholder {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 100%;
          height: 100%;
          font-size: 12px;
          color: #aaa;
        }
        .image-upload {
          display: none;
        }
        .custom-upload-button {
          display: none;
          padding: 6px 10px;
          cursor: pointer;
          background-color: rgba(200, 207, 214, 0.8);
          color: white;
          border-radius: 4px;
          font-size: 12px;
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
        }
        .profile-image-wrapper:hover .custom-upload-button {
          display: inline-block;
        }
      `}</style>
    </>
  );
}
