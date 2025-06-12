import { Outlet } from "react-router-dom";
import Footer from "../Footer/Footer";
import CustomNavbar from "../Navbar/Navbar";
export default function Layout() {
  return (
    <div className="min-h-screen flex flex-col">
      <CustomNavbar />
      <main className="flex-grow"> {/* to make sure the footer stick to the bottom always */}
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
