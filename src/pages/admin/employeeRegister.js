import FieldForm from "@/components/form/FieldForm";
import NavTitle from "@/components/menu/NavTitle";
import { useState } from "react";

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
    positionSalaryId: "",
    otherInformation: "",
    addresses: [
      {
        street: "",
        number: "",
        neighborhood: "",
        zipCode: "",
        complement: "",
        city: "",
        state: "",
      },
    ],
  });
  const [profileImage, setProfileImage] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEmployee((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setProfileImage(URL.createObjectURL(e.target.files[0]));
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
              <div className="col-md-4 mt-3">
                <FieldForm
                  label="Company Email"
                  type="text"
                  name="companyEmail"
                  value={employee.companyEmail}
                  onChange={handleChange}
                />
              </div>
              
              <div className="col-md-5 mt-3">
                <FieldForm
                  label="Position Salary"
                  type="select"
                  id="positionSalaryId"
                  name="positionSalaryId"
                  value={employee.positionSalaryId}
                  onChange={handleChange}
                  options={[
                    { value: "1", label: "Position 1" },
                    { value: "2", label: "Position 2" },
                  ]}
                />
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
            </div>
            <div className="row mt-3">
              <div className="col-12 d-flex justify-content-end">
                <button className="btn btn-primary" type="submit">
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
