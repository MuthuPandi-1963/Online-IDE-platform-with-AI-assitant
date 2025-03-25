import { Outlet } from "react-router-dom";
import Navbar from "./NavBar";
import Footer from "./Footer";

export default function Home() {
    return(
        <div className="flex flex-col h-screen">
            <Navbar/>
            <div className="flex-1">
                <Outlet/>
            </div>
            <Footer/>
        </div>
    )
}