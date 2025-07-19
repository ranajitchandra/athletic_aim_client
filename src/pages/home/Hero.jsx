import { motion } from "framer-motion";
import { FaSearch } from "react-icons/fa";

export default function Hero() {
    return (
        <>
            <div className="hero bg-base-200">
                <div className="hero-content flex-col lg:flex-row-reverse gap-10 items-center">
                    <div className="flex flex-col items-center gap-6 w-full lg:w-1/2">
                        <motion.img
                            src="https://i.ibb.co/G339Dk2G/photo-1542744173-8e7e53415bb0-q-80-w-1170-auto-format-fit-crop-ixlib-rb-4-1.jpg"
                            className="max-w-[300px] shadow-2xl border-l-4 border-b-4 border-amber-500 rounded-t-2xl rounded-r-2xl"
                            alt="Job Search 1"
                            animate={{ y: [80, 150, 80] }}
                            transition={{ duration: 4, repeat: Infinity }}
                        />
                        <motion.img
                            src="https://i.ibb.co/KxqJRscB/photo-1552664730-d307ca884978-q-80-w-1170-auto-format-fit-crop-ixlib-rb-4-1.jpg"
                            className="max-w-[300px] shadow-2xl border-l-4 border-b-4 border-amber-500 rounded-t-2xl rounded-r-2xl"
                            alt="Job Search 2"
                            animate={{ x: [150, 100, 150] }}
                            transition={{ duration: 8, delay: 2, repeat: Infinity }}
                        />
                    </div>

                    <div className="w-full lg:w-1/2">
                        <h1 className="text-4xl lg:text-5xl font-bold text-primary mb-4">
                            Find Your Dream Job Today!
                        </h1>
                        <p className="text-base-content/80 mb-6">
                            Explore thousands of job opportunities from top companies.
                            Customize your search, apply easily, and take the next step in your career.
                        </p>

                        <div className="flex items-center gap-2 bg-white dark:bg-base-100 shadow-lg rounded-full px-4 py-2 w-full max-w-md">
                            <FaSearch className="text-gray-400" />
                            <input
                                type="text"
                                placeholder="Search jobs, companies, keywords..."
                                className="input border-none focus:outline-none w-full text-base bg-transparent"
                            />
                            <button className="btn btn-primary btn-sm rounded-full px-6">
                                Search
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
