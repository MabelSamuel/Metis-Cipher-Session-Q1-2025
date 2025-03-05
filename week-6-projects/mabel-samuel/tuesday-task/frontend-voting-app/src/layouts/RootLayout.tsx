import { Outlet } from "react-router";
import Navbar from "../components/custom/Navbar";
import { ToastContainer } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";

const RootLayout = () => {
  return (
    <>
      <Navbar />
      <ToastContainer
        position="top-center"
        autoClose={3000}
        hideProgressBar
        newestOnTop
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
      <Outlet />
    </>
  );
};

export default RootLayout;
