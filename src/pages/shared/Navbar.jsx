
import { Link, NavLink, useNavigate } from "react-router"
import athletLogo from "../../assets/logo.png"
import PlusTrail from "./PlusTrail"
import { toast } from "react-toastify"
import { useContext } from "react"
import { AuthContext } from "../../context/AuthContextProvider"
import Loading from "./Loading"


export default function Navbar() {

    const { user, loading, theTheme, setTheTheme, logOutUser } = useContext(AuthContext)
    const navigate = useNavigate()

    if (loading) {
        return <Loading></Loading>
    }
    function handleLogOut() {
        logOutUser()
            .then(() => {
                toast.success(`Logout Successful, `);
                navigate("/login")
            })
    }

    return (
        <>
            <div className="navbar bg-base-100 shadow-md border-b border-b-gray-300">
                <div className="navbar-start">
                    <div className="dropdown">
                        <div tabIndex={0} className="btn btn-ghost lg:hidden">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" />
                            </svg>
                        </div>
                        <ul tabIndex={0} className="menu menu-sm dropdown-content bg-base-100 rounded-box z-10 mt-3 w-52 p-2 shadow">
                            <li><NavLink to="/" className="hover:bg-primary py-1 px-5 hover:text-white duration-500 rounded-sm">Home</NavLink></li>
                            <li><NavLink to="/explore_gardeners" className="hover:bg-primary py-1 px-5 hover:text-white duration-500 rounded-sm">Explore Gardeners</NavLink></li>
                            <li><NavLink to="/tips" className="hover:bg-primary py-1 px-5 hover:text-white duration-500 rounded-sm">Browse Tips</NavLink></li>
                            <li><NavLink to="/share_garden_tip" className="hover:bg-primary py-1 px-5 hover:text-white duration-500 rounded-sm">Share a Garden Tip</NavLink></li>
                            <li><NavLink to="/my_tips" className="hover:bg-primary py-1 px-5 hover:text-white duration-500 rounded-sm">My Tips</NavLink></li>
                        </ul>
                    </div>
                    <div className="flex items-center gap-3">
                        <img width="150" src={athletLogo} alt="athlet" />
                    </div>
                </div>

                {/* nav menu */}
                <div className="navbar-center hidden lg:flex">
                    <ul className="menu menu-horizontal gap-4 px-1">
                        <li><NavLink to="/" className="hover:bg-primary py-1 px-5 hover:text-white duration-500 rounded-sm">Home</NavLink></li>
                        { user &&
                            <>
                                <li><NavLink to="/myApplications" className="hover:bg-primary py-1 px-5 hover:text-white duration-500 rounded-sm">My Applications</NavLink></li>
                                <li><NavLink to="/addJob" className="hover:bg-primary py-1 px-5 hover:text-white duration-500 rounded-sm">Add Job</NavLink></li>
                                <li><NavLink to="/myPostedJobs" className="hover:bg-primary py-1 px-5 hover:text-white duration-500 rounded-sm">Posted Jobs</NavLink></li>
                            </>
                        }
                    </ul>
                </div>

                <div className="navbar-end">
                    {/* <input onClick={() => setTheTheme(!theTheme)} type="checkbox" defaultChecked className="toggle toggle-sm mr-5" /> */}
                    {user ?
                        <div className="flex gap-2">
                            <div className="dropdown dropdown-end">
                                <div
                                    tabIndex={0}
                                    className="btn btn-ghost btn-circle avatar tooltip tooltip-left text-primary"
                                    data-tip={user.displayName}
                                >
                                    <div className="w-10 rounded-full">
                                        <img
                                            src="https://letsenhance.io/static/73136da51c245e80edc6ccfe44888a99/1015f/MainBefore.jpg"
                                            alt="User"
                                        />
                                    </div>
                                </div>

                                <ul
                                    tabIndex={0}
                                    className="menu menu-sm dropdown-content bg-base-100 rounded-box z-10 mt-4 w-60 p-4 shadow"
                                >
                                    <li className="border-b border-gray-200">
                                        <a>
                                            Name: <span className="font-bold">{user.displayName}</span>
                                        </a>
                                    </li>
                                    <li className="border-b border-gray-200">
                                        <a>
                                            Email: <span className="font-bold">{user.email}</span>
                                        </a>
                                    </li>
                                    <li>
                                        <button onClick={() => handleLogOut()}>Logout</button>
                                    </li>
                                </ul>
                            </div>
                        </div>

                        :
                        <div className="navbar-center hidden lg:flex">
                            <ul className="menu menu-horizontal gap-4 px-1">
                                <li><NavLink to="/login" className="hover:bg-primary py-1 px-5 hover:text-white duration-500 rounded-sm">Signin</NavLink></li>
                                <li><NavLink to="/register" className="hover:bg-primary py-1 px-5 hover:text-white duration-500 rounded-sm">Signup</NavLink></li>
                            </ul>
                        </div>
                    }



                </div>
            </div>





            <PlusTrail></PlusTrail>
            {/* <div classNameName="flex justify-between items-center navbar bg-base-100 shadow-sm py-3 px-10">
                <div classNameName="flex items-center gap-3">
                    <img classNameName="bg-black rounded-xl w-12" src={logo} alt="" />
                    <span classNameName="text-3xl font-bold text-primary">Transa Pay</span>
                </div>
                <ul classNameName="flex items-center gap-4 text-accent font-semibold">
                    <li>
                        <NavLink to="/" classNameName="hover:bg-primary py-1 px-5 hover:text-white duration-500 rounded-sm">Home</NavLink>
                    </li>
                    <li>
                        <NavLink to="/bills" classNameName="hover:bg-primary py-1 px-5 hover:text-white duration-500 rounded-sm">Bills</NavLink>
                    </li>
                    <li>
                        <NavLink to="/auth/profile" classNameName="hover:bg-primary py-1 px-5 hover:text-white duration-500 rounded-sm">Profile</NavLink>
                    </li>
                    <li>
                        <NavLink to="/auth/contact" classNameName="hover:bg-primary py-1 px-5 hover:text-white duration-500 rounded-sm">Contact</NavLink>
                    </li>
                </ul>
                <div classNameName="flex gap-2">
                    {
                        user ?
                            <>
                                <input type="text" placeholder="Search" classNameName="none input input-bordered w-24 md:w-auto" />
                                <div classNameName="dropdown dropdown-end">
                                    <div tabIndex={0} role="button" classNameName="btn btn-ghost btn-circle avatar">
                                        <div classNameName="w-10 rounded-full">
                                            <img
                                                alt="Tailwind CSS Navbar component"
                                                src={user.photoURL} />
                                        </div>
                                    </div>
                                    <ul
                                        tabIndex={0}
                                        classNameName="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-4 w-60 p-4 shadow">
                                        <li classNameName="border-b border-gray-200"><a>Name: <span classNameName="font-bold"> {user.displayName} </span></a></li>
                                        <li classNameName="border-b border-gray-200"><a>Name: <span classNameName="font-bold"> {user.email} </span></a></li>
                                        <li classNameName="border-b border-gray-200 flex">
                                            <a>
                                                Balance: <span classNameName="font-bold flex gap-1 items-center"> {balance} <TbCurrencyTaka size={15} /></span>

                                            </a>
                                        </li>
                                        <li onClick={handleLogOut}><a>Logout</a></li>
                                    </ul>
                                </div>
                            </>
                            :
                            <ul classNameName="flex items-center gap-2">
                                <li>
                                    <Link to="/auth/login" classNameName="text-accent font-bold hover:bg-primary py-1 px-5 hover:text-white duration-500 rounded-sm">Login</Link>
                                </li>
                                <li>
                                    <Link to="/auth/register" classNameName="text-accent font-bold hover:bg-primary py-1 px-5 hover:text-white duration-500 rounded-sm">Register</Link>
                                </li>
                            </ul>
                    }

                </div>
            </div> */}
        </>
    )
}