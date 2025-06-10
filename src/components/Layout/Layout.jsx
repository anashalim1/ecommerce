import { Outlet } from "react-router-dom";
import Footer from "../Footer/Footer";
import CustomNavbar from "../Navbar/Navbar";
export default function Layout() {
  return (
    <>
      <CustomNavbar />
      <Outlet />
      <Footer />
    </>
  );
}
