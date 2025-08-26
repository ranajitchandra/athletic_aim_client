import { Link, NavLink, useNavigate } from "react-router";
import athletLogo from "../../assets/logo.png";
import PlusTrail from "./PlusTrail";
import { toast } from "react-toastify";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContextProvider";
import Loading from "./Loading";
import useUserRole from "../hooks/useUserRole";
import { motion } from "framer-motion";
import { FiMoon, FiSun } from "react-icons/fi";

export default function Navbar() {
    const { user, loading, theTheme, setTheTheme, logOutUser } = useContext(AuthContext);
    const { role, roleLoading } = useUserRole();
    const navigate = useNavigate();

    if (loading) return <Loading />;

    function handleLogOut() {
        logOutUser().then(() => {
            toast.success("Logout Successful");
            navigate("/login");
        });
    }

    const navLinks = (
        <>
            <motion.li whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
                <NavLink to="/" className="bg-primary text-primary-content">Home</NavLink>
            </motion.li>
            <motion.li whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
                <NavLink to="/events" className="bg-primary text-primary-content">Events</NavLink>
            </motion.li>
            {user && !roleLoading && role === "user" && (
                <motion.li whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
                    <NavLink to="/myBooking" className="bg-primary text-primary-content">My Booking</NavLink>
                </motion.li>
            )}
            {user && !roleLoading && role === "admin" && (
                <>
                    <motion.li whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
                        <NavLink to="/addEvent" className="bg-primary text-primary-content">Add Event</NavLink>
                    </motion.li>
                    <motion.li whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
                        <NavLink to="/manageEvent" className="bg-primary text-primary-content">Manage Event</NavLink>
                    </motion.li>
                    <motion.li whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
                        <NavLink to="/users" className="bg-primary text-primary-content">Users</NavLink>
                    </motion.li>
                </>
            )}
        </>
    );

    return (
        <>
            <motion.div
                className="navbar sticky top-0 z-50 px-6 lg:px-10 py-3 bg-base-100/90 backdrop-blur-md shadow-lg border-b border-gray-200"
                initial={{ y: -80, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
            >
                {/* Logo & Mobile */}
                <div className="navbar-start">
                    <div className="dropdown">
                        <button tabIndex={0} className="btn btn-ghost lg:hidden">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h12M4 18h16" />
                            </svg>
                        </button>
                        <motion.ul
                            tabIndex={0}
                            className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow-xl bg-base-200 rounded-xl w-56"
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.3 }}
                        >
                            {navLinks}
                        </motion.ul>
                    </div>

                    <Link to="/" className="flex items-center gap-2">
                        <motion.img
                            src={athletLogo}
                            alt="logo"
                            className={`w-32 lg:w-40 rounded-md ${theTheme ? "" : "bg-white p-1"}`}
                            transition={{ type: "spring", stiffness: 300 }}
                        />
                    </Link>
                </div>

                {/* Desktop Nav Links */}
                <div className="navbar-center hidden lg:flex">
                    <ul className="menu menu-horizontal gap-4 font-medium text-gray-700">{navLinks}</ul>
                </div>

                {/* Right section */}
                <div className="navbar-end flex items-center gap-3">
                    {/* Theme Toggle */}
                    <button
                        onClick={() => setTheTheme(!theTheme)}
                        className={`inline-flex items-center gap-2 px-4 py-2 rounded-full font-semibold transition-colors duration-300 shadow-md
                            ${theTheme
                                ? "bg-primary text-primary-content hover:bg-primary/80"
                                : "bg-secondary text-secondary-content hover:bg-secondary/80"
                            }`}
                    >
                        {theTheme ? <FiMoon size={20} /> : <FiSun size={20} />}
                    </button>

                    {/* User Avatar */}
                    {user ? (
                        <motion.div className="dropdown dropdown-end" whileHover={{ scale: 1.05 }}>
                            <button tabIndex={0} className="btn btn-ghost btn-circle avatar ring ring-primary ring-offset-base-100 ring-offset-2">
                                <div className="w-10 rounded-full overflow-hidden">
                                    <img src={user?.photoURL} alt="User" />
                                </div>
                            </button>
                            <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 p-3 shadow-xl bg-base-200 rounded-xl w-60">
                                <li>
                                    <Link to="/profile" className="font-semibold hover:bg-primary/10 rounded">Profile</Link>
                                </li>
                                <li className="text-sm mt-1">Email: <b>{user.email}</b></li>
                                <li>
                                    <button onClick={handleLogOut} className="btn btn-error btn-sm mt-2 w-full">Logout</button>
                                </li>
                            </ul>
                        </motion.div>
                    ) : (
                        <ul className="menu menu-horizontal hidden lg:flex gap-2">
                            <motion.li whileHover={{ scale: 1.05 }}>
                                <NavLink to="/login" className="btn btn-outline btn-sm">Signin</NavLink>
                            </motion.li>
                            <motion.li whileHover={{ scale: 1.05 }}>
                                <NavLink to="/register" className="btn btn-primary btn-sm text-white">Signup</NavLink>
                            </motion.li>
                        </ul>
                    )}
                </div>
            </motion.div>
            <PlusTrail />
        </>
    );
}
