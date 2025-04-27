import { Outlet } from "react-router-dom";
import Navbar from "./NavBar";
import Footer from "./Footer";

export default function Home() {
    return(
        <>
            <Navbar/>
        <div className="flex flex-col h-screen">
            <div className="flex-1">
                <Outlet/>
            </div>
            <Footer/>
        </div>
        </>
    )
}