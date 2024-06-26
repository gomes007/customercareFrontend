import { useState } from "react";
import NavBar from "./NavBar";

const Menu = ({ children }) => {
  const [open, setOpen] = useState("opened");

  const handleMenu = () => {
    setOpen(open === "opened" ? "closed" : "opened");
  };

  return (
    <>
      <NavBar handleMenu={handleMenu} menuOpen={open === "opened"} />
      <div className={`menu ${open} ${open === "opened" ? "menu-shadow" : ""}`}>
        {open === "opened" && (
          <button className="menu-close-btn" onClick={handleMenu}>
            <i className="bi bi-chevron-double-left"></i>
          </button>
        )}
        <h1 className="logo-img">
          <img src="/img/logo.png" />
        </h1>
        <ul className="menu-content">
          <li>
            <a className="link-menu" href="/admin/permission">
              <i className="bi bi-shield-lock"></i>
              <span>Permission</span>
            </a>
          </li>
          <li>
            <a className="link-menu" href="/admin/role">
              <i className="bi bi-person-rolodex"></i>
              <span>Role</span>
            </a>
          </li>
          <li>
            <a className="link-menu" href="/admin/roleList">
              <i className="bi bi-person-rolodex"></i>
              <span>Role List</span>
            </a>
          </li>
        </ul>
      </div>
      <div className={`site ${open}`}>
        <div className="content">{children}</div>
      </div>
    </>
  );
};

export default Menu;
