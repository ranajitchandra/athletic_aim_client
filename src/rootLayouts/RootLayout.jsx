import { Outlet } from "react-router";
import Footer from "../pages/shared/Footer";
import Navbar from "../pages/shared/Navbar";


export default function RootLayout() {

    return (
        <>
            <div className="max-w-7xl mx-auto bg-blue-50">
                <Navbar></Navbar>
                <Outlet></Outlet>
                <Footer></Footer>
            </div>
        </>
    )
}