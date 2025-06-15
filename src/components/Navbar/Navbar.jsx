import React, { useContext, useEffect, useState } from "react";

import { NavLink, Link, useNavigate } from "react-router-dom";
import {
  Navbar,
  NavbarBrand,
  NavbarCollapse,
  NavbarLink,
  NavbarToggle,
} from "flowbite-react";
import { AuthContext } from "../../context/AuthContext";
import { CartContext } from "../../context/CartContext.jsx";

export default function CustomNavbar() {
  const { authToken, setAuthToken } = useContext(AuthContext);
  const navigate = useNavigate();
  const numberOfCartItems = useContext(CartContext).numberOfCartItems;
  function handleLogout() {
    localStorage.removeItem("authToken");
    setAuthToken(null);
    navigate("/login");
  }
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <Navbar
      className={`sticky top-0 w-full z-50 transition-all duration-300 ${
        isScrolled ? "bg-white shadow-md py-4" : "bg-transparent py-6"
      }`}
    >
      <NavbarBrand as={NavLink} to="/">
        <div className="flex items-center gap-4">
          <span className="self-center  whitespace-nowrap text-xl  text-white font-bold">
            Fresh cart
          </span>
          <span>
            <i className="fa-solid fa-cart-shopping self-center  whitespace-nowrap text-xl  text-white"></i>
          </span>
        </div>
      </NavbarBrand>
      <NavbarToggle />
      <NavbarCollapse>
        {authToken ? (
          <>
            <NavbarLink as={NavLink} to="/" end className="!text-white">
              Home
            </NavbarLink>

            <NavbarLink as={NavLink} to="/brands" className="!text-white">
              Brands
            </NavbarLink>
            <NavbarLink as={NavLink} to="/categories" className="!text-white">
              Categories
            </NavbarLink>
            <NavbarLink as={NavLink} to="/allorders" className="!text-white">
              My orders
            </NavbarLink>
            <NavbarLink as={NavLink} to="/cart" className="!text-white">
              <i className="fa-solid fa-cart-shopping text-xl pr-1.5"></i>{" "}
              {numberOfCartItems}
            </NavbarLink>
            <span className="cursor-pointer !text-white" onClick={handleLogout}>
              Logout
            </span>
          </>
        ) : (
          <>
            <NavbarLink as={NavLink} to="/login" className="!text-white">
              Login
            </NavbarLink>
            <NavbarLink as={NavLink} to="/register" className="!text-white">
              Register
            </NavbarLink>
          </>
        )}
      </NavbarCollapse>
    </Navbar>
  );
}
