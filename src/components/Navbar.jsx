import React from "react";
import Logo from "./Navbar/Logo";

function Navbar({children}) {
   
  return (
    <nav className="nav-bar">
     <Logo/>
    {children}
    </nav>
  );
}

export default Navbar;
