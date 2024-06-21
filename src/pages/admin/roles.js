import { useState } from "react";
import { createRole } from "../../service/roleService";

export default function Roles() {
  const [permissions, setPermissions] = useState([]);
  const [roles, setRoles] = useState([]);
  const [role, setRole] = useState({ name: "", permissions: [] });

  const handleRoleNameChange = (e) => {
    setRole({ ...role, name: e.target.value });
  };

  const handlePermissionSelect = (e) => {
    const permissionId = parseInt(e.target.value);
    const isChecked = e.target.checked;
    if (isChecked) {
      setRole({ ...role, permissions: [...role.permissions, permissionId] });
    } else {
      setRole({
        ...role,
        permissions: role.permissions.filter((p) => p !== permissionId),
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newRole = await createRole(role);
    setRoles([...roles, newRole]);
    setRole({ name: "", permissions: [] });
  };

  return (
    <div className="container">
      <div className="card mt-5 p-3">
        <div className="card-header bg-light">
          <h3>Roles and Permissions</h3>
        </div>

        <div className="card-body">
          <div className="col-md-8">
            <input
              type="text"
              value={role.name}
              onChange={handleRoleNameChange}
              placeholder="Role Name"
            />
          </div>
          <div className="col-md-8">
            <div className="form-control">
              <label>PERMISSIONS: </label>
              {permissions.map((permission, index) => {
                return (
                  <div key={index}>
                    <input
                      className="m-1"
                      type="checkbox"
                      id={permission.id}
                      name={permission.name}
                      onChange={(e) => handlePermissionSelect(e, permission.id)}
                    />
                    <label htmlFor={permission.id}>{permission.name}</label>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        <div className="col-03 d-flex justify-content-end">
          <button
            className="btn btn-primary"
            type="submit"
            onClick={handleSubmit}
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
}
