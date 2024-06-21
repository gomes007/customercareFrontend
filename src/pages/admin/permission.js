import FieldForm from "@/components/form/FieldForm";
import NavTitle from "@/components/menu/NavTitle";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import {
    createPermission,
    getPermissions,
} from "../../service/permissionService";

export default function Permission() {
  const [permission, setPermission] = useState({ name: "" });
  const [permissions, setPermissions] = useState([]);

  useEffect(() => {
    fetchPermissions();
  }, []);

  const fetchPermissions = async () => {
    try {
      const response = await getPermissions();
      setPermissions(response);
    } catch (error) {
      toast.error("Error fetching permissions");
      console.error("Error fetching permissions:", error);
    }
  };

  const handlePermission = (e) => {
    setPermission({
      ...permission,
      [e.target.name]: e.target.value,
    });
  };

  const savePermission = async (e) => {
    e.preventDefault();
    try {
      const data = { ...permission };
      const response = await createPermission(data);
      console.log("savePermission", response);
      toast.success("Permission created successfully");
      
      
      setPermissions((prevPermissions) => [...prevPermissions, response]);
      
      
      setPermission({ name: "" });
    } catch (error) {
      toast.error("Error creating permission");
      console.error("Error creating permission:", error);
    }
  };

  return (
    <>
      <NavTitle
        icon={<i className="bi bi-file-earmark-lock2"></i>}
        title="Permissions"
        path={[
          { name: "Home", link: "/" },
          { name: "Permissions", link: "/admin/permissions" },
        ]}
      />
      <div className="container">
        <div className="card mt-5 p-3">
          <div className="card-header bg-light">
            <h3>Permission</h3>
          </div>
          <div className="card-body">
            <div className="col-md-8">
              <FieldForm
                label="Name"
                name="name"
                type="text"
                value={permission.name}
                onChange={handlePermission}
              />
            </div>
            <div className="col-03 d-flex justify-content-end">
              <button
                className="btn btn-primary"
                type="button"
                onClick={savePermission}
              >
                Submit
              </button>
            </div>
          </div>
          <div className="card-footer">
            <h4>Permissions List</h4>
            <ul className="list-group">
              {permissions.map((perm, index) => (
                <li key={index} className="list-group-item">
                  {perm.name}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}
