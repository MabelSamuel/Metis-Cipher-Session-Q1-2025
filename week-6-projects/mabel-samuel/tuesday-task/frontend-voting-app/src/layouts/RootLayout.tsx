import { Outlet } from "react-router"
import Navbar from "../components/custom/Navbar"



const RootLayout = () => {
  return (
    <>
    <Navbar/>
    <Outlet/> 
    </>
  )
}

export default RootLayout