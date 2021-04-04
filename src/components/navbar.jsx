import React, { useEffect, useState } from "react";
import logo from "../netflix.png";
import "./navbar.css";

const Navbar = () => {
  const [navBg, setNavBg] = useState(false);

  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 200) {
        setNavBg(true);
      } else setNavBg(false);
    });
    return function () {
      window.removeEventListener("scroll");
    };
  }, []);
  return (
    <div className={`nav ${navBg && "nav__bg"}`}>
      <img src={logo} alt="netflix" className="nav__logo" />
    </div>
  );
};

export default Navbar;
