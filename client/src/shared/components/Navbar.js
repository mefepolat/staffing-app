import "./Navbar.css"



const NavBar = () => {
    return (
      <nav>
        <div className="nav-left">
          <ul>Home</ul>
        </div>
        <div className="nav-right">
          <ul>Sign out</ul>
          <ul>Sign in</ul>
          <ul>Sign up</ul>
        </div>
      </nav>
    );
  };
  
  export default NavBar;
  