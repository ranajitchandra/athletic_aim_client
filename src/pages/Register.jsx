import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router";
import { toast } from "react-toastify";
import { FcGoogle } from "react-icons/fc";
import { AuthContext } from "../context/AuthContextProvider";
import Lottie from "lottie-react";
import registerAni from "../assets/registerlottie.json"
import useAxiosApi from "./hooks/useAxiosApi";

export default function Register() {
    const { createUser, updateProfileUser, loginWithGoogle } = useContext(AuthContext);
    const navigate = useNavigate();
    const [name, setName] = useState("");
    const [photo, setPhoto] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errors, setErrors] = useState({});
    const axiosInstance = useAxiosApi();

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passwordRegex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*[\W_]).{8,}$/;

    const validateField = (field, value) => {
        const newErrors = { ...errors };
        if (field === "email") {
            !emailRegex.test(value) ? newErrors.email = "Invalid email format" : delete newErrors.email;
        }
        if (field === "password") {
            !passwordRegex.test(value) ? newErrors.password = "Password must be at least 8 characters, include uppercase, lowercase, and a special character." : delete newErrors.password;
        }
        if (field === "name") {
            !value.trim() ? newErrors.name = "Name is required" : delete newErrors.name;
        }
        if (field === "photo") {
            !value.trim() ? newErrors.photo = "Photo URL is required" : delete newErrors.photo;
        }
        setErrors(newErrors);
    };

    const handleChange = (setter, field) => (e) => {
        setter(e.target.value);
        validateField(field, e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const newErrors = {};
        if (!name.trim()) newErrors.name = "Name is required";
        if (!photo.trim()) newErrors.photo = "Photo URL is required";
        if (!emailRegex.test(email)) newErrors.email = "Invalid email format";
        if (!passwordRegex.test(password)) newErrors.password = "Password must be at least 8 characters and include uppercase, lowercase, special char";
        setErrors(newErrors);

        if (Object.keys(newErrors).length === 0) {
            try {
                const result = await createUser(email, password);
                await axiosInstance.post('/users', {
                    name, photoURL: photo, email, role: 'user',
                    created_at: new Date().toISOString(),
                    last_log_in: new Date().toISOString()
                });
                await updateProfileUser({ displayName: name, photoURL: photo });
                toast.success(`Welcome, ${result.user.displayName}`);
                navigate("/");
            } catch (err) {
                toast.info("Account may already exist");
            }
        }
    };

    const handleGoogleLogin = async () => {
        try {
            const result = await loginWithGoogle();
            toast.success(`Login Successful, ${result.user.displayName}`);
            const user = result.user;
            await axiosInstance.post('/users', {
                name: user.displayName,
                photoURL: user.photoURL,
                email: user.email,
                role: 'user',
                created_at: new Date().toISOString(),
                last_log_in: new Date().toISOString()
            });
            navigate("/");
        } catch {
            toast.error("Google Login Failed");
        }
    };

    return (
        <div className="flex flex-col lg:flex-row items-center justify-center gap-6 min-h-screen bg-base-100 py-10 px-4">
            {/* Form */}
            <form
                onSubmit={handleSubmit}
                className="bg-white p-6 sm:p-8 rounded-md shadow-2xl w-full max-w-md"
            >
                <h2 className="text-2xl font-bold mb-6 text-center text-primary">Register</h2>

                {/* Name */}
                <div className="mb-4">
                    <label className="block mb-1 font-medium text-accent">Name</label>
                    <input
                        type="text"
                        className={`w-full px-3 py-2 rounded border ${errors.name ? "border-red-500" : "border-primary"} focus:outline-none focus:ring-2 focus:ring-primary transition`}
                        value={name}
                        onChange={handleChange(setName, "name")}
                    />
                    {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
                </div>

                {/* Photo URL */}
                <div className="mb-4">
                    <label className="block mb-1 font-medium text-accent">Photo URL</label>
                    <input
                        type="text"
                        className={`w-full px-3 py-2 rounded border ${errors.photo ? "border-red-500" : "border-primary"} focus:outline-none focus:ring-2 focus:ring-primary transition`}
                        value={photo}
                        onChange={handleChange(setPhoto, "photo")}
                    />
                    {errors.photo && <p className="text-red-500 text-sm mt-1">{errors.photo}</p>}
                </div>

                {/* Email */}
                <div className="mb-4">
                    <label className="block mb-1 font-medium text-accent">Email</label>
                    <input
                        type="text"
                        className={`w-full px-3 py-2 rounded border ${errors.email ? "border-red-500" : "border-primary"} focus:outline-none focus:ring-2 focus:ring-primary transition`}
                        value={email}
                        onChange={handleChange(setEmail, "email")}
                    />
                    {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                </div>

                {/* Password */}
                <div className="mb-4">
                    <label className="block mb-1 font-medium text-accent">Password</label>
                    <input
                        type="password"
                        className={`w-full px-3 py-2 rounded border ${errors.password ? "border-red-500" : "border-primary"} focus:outline-none focus:ring-2 focus:ring-primary transition`}
                        value={password}
                        onChange={handleChange(setPassword, "password")}
                    />
                    {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
                </div>

                {/* Buttons */}
                <button
                    type="submit"
                    className="w-full bg-primary text-white py-2 rounded hover:bg-secondary transition-colors duration-300"
                >
                    Create
                </button>

                <button
                    type="button"
                    onClick={handleGoogleLogin}
                    className="w-full flex items-center justify-center text-accent mt-4 py-2 border border-primary rounded bg-white hover:bg-gray-100 transition"
                >
                    <FcGoogle className="mr-2" /> Register with Google
                </button>

                <p className="text-accent mt-4 text-center">
                    Already have an account? <Link to="/login" className="link link-secondary font-bold">Login</Link>
                </p>
            </form>

            {/* Lottie Animation */}
            <div className="w-full max-w-lg">
                <Lottie animationData={registerAni} className="w-full h-auto" />
            </div>
        </div>
    );
}
