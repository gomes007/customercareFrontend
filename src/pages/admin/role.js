import FieldForm from "@/components/form/FieldForm";
import NavTitle from "@/components/menu/NavTitle";
import { createRole, updateRole } from "@/service/roleService";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { getPermissions } from "@/service/permissionService";
import { useRouter } from "next/router";

export default function Role() {
  const [permissions, setPermissions] = useState([]);
  const [role, setRole] = useState({ id: null, name: "", permissions: [] });
  const router = useRouter();

  useEffect(() => {
    const fetchPermissionsAndRoles = async () => {
      try {
        const permissionsResponse = await getPermissions();
        setPermissions(permissionsResponse.items || []);

        if (router.query.id) {
          setRole({
            id: router.query.id,
            name: router.query.name,
            permissions: JSON.parse(router.query.permissions)
          });
        }
      } catch (error) {
        console.error("Error getting permissions:", error);
      }
    };
    fetchPermissionsAndRoles();
  }, [router.query]);

  const handleRoleNameChange = (e) => {
    setRole({ ...role, name: e.target.value });
  };

  const handlePermissionSelect = (e, id) => {
    const checked = e.target.checked;
    setRole(prevRole => {
      if (checked) {
        return { ...prevRole, permissions: [...prevRole.permissions, { id }] };
      } else {
        return {
          ...prevRole,
          permissions: prevRole.permissions.filter(
            (permission) => permission.id !== id
          ),
        };
      }
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (role.id) {
        await updateRole(role.id, role);
        toast.success("Role updated successfully");
      } else {
        await createRole(role);
        toast.success("Role created successfully");
      }
      setRole({ id: null, name: "", permissions: [] });
      document.querySelectorAll('input[type="checkbox"]').forEach(checkbox => {
        checkbox.checked = false;
      });
    } catch (error) {
      console.error("Error saving role:", error);
      toast.error("Failed to save role");
    }
  };

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
            <h3>{role.id ? "Edit Role" : "Register"}</h3>
          </div>

          <div className="card-body">
            <div className="col-md-8">
              <FieldForm
                label="Name"
                name="name"
                type="text"
                value={role.name}
                onChange={handleRoleNameChange}
                required
              />
            </div>
            <div className="col-md-8 mt-3">
              <div className="form-control">
                <label>Permissions: </label>
                {permissions.map((permission, index) => (
                  <div key={index}>
                    <input
                      className="m-1"
                      type="checkbox"
                      id={permission.id}
                      name={permission.name}
                      checked={role.permissions.some(p => p.id === permission.id)}
                      onChange={(e) =>
                        handlePermissionSelect(e, permission.id)
                      }
                    />
                    <label htmlFor={permission.id}>{permission.name}</label>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="col-03 d-flex justify-content-end">
            <button
              className="btn btn-primary"
              type="submit"
              onClick={handleSubmit}
            >
              {role.id ? "Update" : "Submit"}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
