const NavTitle = ({ icon, title, path }) => {
    const iconStyle = {
      marginRight: "5px"
    };
  
    return (
      <div className="nav-title">
        <h1>
          {icon && <span style={iconStyle}>{icon}</span>}
          {title}
        </h1>
        <div className="path">
          <nav>
            <ol className="breadcrumb">
              {path.map((item, index) => (
                <li className="breadcrumb-item" key={index}>
                  <a href={item.link}>
                    {item.icon && <span style={iconStyle}>{item.icon}</span>}
                    {item.name}
                  </a>
                </li>
              ))}
            </ol>
          </nav>
        </div>
      </div>
    );
  };
  
  export default NavTitle;
  