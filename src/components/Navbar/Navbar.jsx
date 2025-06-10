import React from "react";
import { NavLink, Link, useNavigate } from "react-router-dom";
import {
  Navbar,
  NavbarBrand,
  NavbarCollapse,
  NavbarLink,
  NavbarToggle,
} from "flowbite-react";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { CartContext } from "../../context/CArtContext";

export default function CustomNavbar() {
  const { authToken, setAuthToken } = useContext(AuthContext);
  const navigate = useNavigate();
  const numberOfCartItems = useContext(CartContext).numberOfCartItems;
  function handleLogout() {
    localStorage.removeItem("authToken");
    setAuthToken(null);
    navigate("/login");
  }

  return (
    <Navbar className="sticky top-0  w-full z-50  py-5">
      <NavbarBrand href="https://flowbite-react.com">
        <span className="self-center whitespace-nowrap text-xl font-semibold text-white">
          Fresh cart <i class="fa-solid fa-cart-shopping"></i>
        </span>
      </NavbarBrand>
      <NavbarToggle />
      <NavbarCollapse>
        {authToken ? (
          <>
            <NavbarLink as={NavLink} to="/" end className="!text-white">
              Home
            </NavbarLink>
            <NavbarLink as={NavLink} to="/products" className="!text-white">
              Products
            </NavbarLink>
            <NavbarLink as={NavLink} to="/brands" className="!text-white">
              Brands
            </NavbarLink>
            <NavbarLink as={NavLink} to="/categories" className="!text-white">
              Categories
            </NavbarLink>
            <NavbarLink as={NavLink} to="/profile" className="!text-white">
              Profile
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
