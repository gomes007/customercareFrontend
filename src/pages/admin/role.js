import { useState } from "react";
import { createRole } from "../../service/roleService";
import FieldForm from "@/components/form/FieldForm";

export default function Roles() {
  const [permissions, setPermissions] = useState([]);
  const [roles, setRoles] = useState([]);
  const [role, setRole] = useState({ name: "", permissions: [] });

  const handleRoleNameChange = (e) => {
    setRole({ ...role, name: e.target.value });
  };

  

  return (
    <div className="container">
      <div className="card mt-5 p-3">
        <div className="card-header bg-light">
          <h3>Roles and Permissions</h3>
        </div>
        
        <div className="card-body">
          <div className="col-md-8">
          <FieldForm
          label="Name"
          name="name"
          type="text"
          value={role.name}
          onChange={handleRoleNameChange}
        />
          </div>
          <div className="col-md-8">
            <div className="form-control">
              
            </div>
          </div>
        </div>

        <div className="col-03 d-flex justify-content-end">
          <button
            className="btn btn-primary"
            type="submit"
            
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
}
