import { useRouter } from "next/router";
import { useState } from "react";
import NavBar from "./NavBar";

const Menu = ({ children }) => {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(true);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    router.push("/login");
  };

  return (
    <>
      <NavBar handleMenu={toggleMenu} menuOpen={isOpen} />
      <div className={`menu ${isOpen ? "opened" : "closed"}`}>
        <ul className="menu-content">
          <MenuItem link="/admin/employeeRegister" icon="bi-person" text="Employee" />
          <MenuItem link="/admin/positionSalary" icon="bi-currency-dollar" text="Position and Salary" />
          <MenuItem link="/admin/role" icon="bi-person-badge" text="Role" />
          <MenuItem link="/admin/permission" icon="bi-shield-lock-fill" text="Permission" />
          <SubMenu title="List" icon="bi-list-ul">
            <MenuItem link="/admin/roleList" icon="bi-list-ul" text="Role list" />
            <MenuItem link="/admin/positionSalaryTable" icon="bi-list-ul" text="Position and Salary List" />
          </SubMenu>

          <MenuItem link="/admin/customerRegister" icon="bi-people" text="Customer" />
          <div className="logout-container">
            <button className="link-menu logout-button" onClick={handleLogout}>
              <i className="bi bi-box-arrow-right me-2"></i>
              <span>Logout</span>
            </button>
          </div>
        </ul>
      </div>
      <div className={`site ${isOpen ? "opened" : "closed"}`}>
        <div className="content">{children}</div>
      </div>
    </>
  );
};

const MenuItem = ({ link, icon, text }) => (
  <li>
    <a className="link-menu" href={link}>
      <i className={`bi ${icon} me-2`}></i>
      <span>{text}</span>
    </a>
  </li>
);

const SubMenu = ({ title, icon, children }) => {
  const [isSubMenuOpen, setIsSubMenuOpen] = useState(false);

  const toggleSubMenu = () => {
    setIsSubMenuOpen(!isSubMenuOpen);
  };

  return (
    <li className="submenu">
      <div className="submenu-title" onClick={toggleSubMenu}>
        <i className={`bi ${icon} me-2`}></i>
        <span>{title}</span>
        <i className={`bi ${isSubMenuOpen ? "bi-chevron-up" : "bi-chevron-down"} ms-auto`}></i>
      </div>
      {isSubMenuOpen && <ul className="submenu-content">{children}</ul>}
    </li>
  );
};

export default Menu;
