import { useContext, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router";
import { toast } from "react-toastify";
import { FcGoogle } from "react-icons/fc";
import Lottie from "lottie-react";
import loginAni from "../assets/loginlottie.json";
import { AuthContext } from "../context/AuthContextProvider";

export default function Login() {
    const { loginUser, loginWithGoogle, resetPassword } = useContext(AuthContext);
    const navigate = useNavigate();
    const location = useLocation();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errors, setErrors] = useState({});

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passwordRegex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*[\W_]).{8,}$/;

    const validateField = (field, value) => {
        const newErrors = { ...errors };

        if (field === "email") {
            if (!emailRegex.test(value)) newErrors.email = "Invalid email format";
            else delete newErrors.email;
        }

        if (field === "password") {
            if (!passwordRegex.test(value)) {
                newErrors.password =
                    "Password must be at least 8 characters and include an uppercase, lowercase & special character.";
            } else delete newErrors.password;
        }
        setErrors(newErrors);
    };

    const handleEmailChange = (e) => {
        const value = e.target.value;
        setEmail(value);
        validateField("email", value);
    };

    const handlePasswordChange = (e) => {
        const value = e.target.value;
        setPassword(value);
        validateField("password", value);
    };

    const handleLogin = (e) => {
        e.preventDefault();
        validateField("email", email);
        validateField("password", password);
        if (Object.keys(errors).length === 0) {
            loginUser(email, password)
                .then((result) => {
                    toast.success(`Login Successful, ${result.user.displayName}`);
                    navigate(location.state || "/");
                })
                .catch(() => toast.info("Doesn't Match, Create an account"));
        }
    };

    const handleGoogleLogin = () => {
        loginWithGoogle()
            .then(() => {
                toast.success(`Login Successful`);
                navigate(location.state || "/");
            })
            .catch(() => toast.error("Google Login Failed"));
    };

    const handleForgotPassword = (e) => {
        e.preventDefault();
        const resetEmail = e.target.email.value;
        resetPassword(resetEmail)
            .then(() => toast.success("Password reset email sent!"))
            .catch(() => toast.error("Something went wrong"));
    };

    return (
        <div className="min-h-screen bg-base-100 flex flex-col lg:flex-row items-center justify-center py-10 px-4 lg:px-16 gap-10">

            {/* Animation */}
            <div className="w-full lg:w-1/2 max-w-md">
                <Lottie animationData={loginAni} loop={true} />
            </div>

            {/* Login Form */}
            <div className="w-full lg:w-1/2 max-w-md">
                <form
                    onSubmit={handleLogin}
                    className="bg-base-200 p-8 rounded-2xl shadow-2xl w-full"
                >
                    <h2 className="text-3xl font-bold mb-6 text-center text-primary">Login</h2>

                    {/* Email */}
                    <div className="mb-4">
                        <label className="block mb-1 font-medium text-accent">Email</label>
                        <input
                            type="text"
                            className={`w-full px-4 py-2 rounded-lg border ${errors.email ? "border-red-500" : "border-primary"} focus:outline-none focus:ring-2 focus:ring-primary transition`}
                            value={email}
                            onChange={handleEmailChange}
                        />
                        {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                    </div>

                    {/* Password */}
                    <div className="mb-4">
                        <label className="block mb-1 font-medium text-accent">Password</label>
                        <input
                            type="password"
                            className={`w-full px-4 py-2 rounded-lg border ${errors.password ? "border-red-500" : "border-primary"} focus:outline-none focus:ring-2 focus:ring-primary transition`}
                            value={password}
                            onChange={handlePasswordChange}
                        />
                        {errors.password && (
                            <p className="text-red-500 text-sm mt-1">{errors.password}</p>
                        )}
                    </div>

                    {/* Forgot Password */}
                    <p
                        onClick={() => document.getElementById("my_modal_2").showModal()}
                        className="text-sm text-secondary font-semibold text-right mb-4 cursor-pointer hover:underline"
                    >
                        Forgot Password?
                    </p>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        className="w-full bg-primary text-white py-2 rounded-lg hover:bg-primary/80 transition-colors duration-300"
                    >
                        Sign In
                    </button>

                    {/* Google Login */}
                    <button
                        onClick={handleGoogleLogin}
                        type="button"
                        className="w-full flex items-center justify-center gap-2 text-accent mt-4 py-2 border border-primary rounded-lg bg-base-100 hover:bg-base-300 transition"
                    >
                        <FcGoogle size={24} /> Login with Google
                    </button>

                    {/* Signup Link */}
                    <p className="text-center mt-4 text-accent">
                        Don't have an account?{" "}
                        <Link to="/register" className="font-bold underline hover:text-secondary">
                            Signup
                        </Link>
                    </p>
                </form>
            </div>

            {/* Modal for Reset Password */}
            <dialog id="my_modal_2" className="modal">
                <form onSubmit={handleForgotPassword} method="dialog" className="modal-box">
                    <h3 className="font-bold text-lg">Reset Password</h3>
                    <p className="py-4">Enter your email to reset your password.</p>
                    <input
                        type="email"
                        placeholder="Enter your email"
                        className="input input-bordered w-full mb-4"
                        name="email"
                        required
                    />
                    <div className="flex justify-end gap-2">
                        <button type="submit" className="btn bg-primary text-white">
                            Reset Password
                        </button>
                        <button
                            type="button"
                            className="btn"
                            onClick={() => document.getElementById("my_modal_2").close()}
                        >
                            Close
                        </button>
                    </div>
                </form>
            </dialog>
        </div>
    );
}
