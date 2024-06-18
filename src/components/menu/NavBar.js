const NavBar = ({ handleMenu, menuOpen }) => {
  return (
    <div className={`navbar ${menuOpen ? "navbar-opened" : "navbar-closed"}`}>
      <button className="btn-menu" onClick={handleMenu}>
        <i className={`bi ${menuOpen ? "" : "bi-list"}`}></i>
      </button>
    </div>
  );
};

export default NavBar;
