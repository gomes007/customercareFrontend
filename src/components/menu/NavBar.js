const NavBar = ({ handleMenu, menuOpen }) => {
  return (
    <div className="navbar">
      <button className="btn-menu" onClick={handleMenu}>
        <i className="bi bi-list"></i>
      </button>
    </div>
  );
};

export default NavBar;
