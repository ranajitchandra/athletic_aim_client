import { Link, useLoaderData, useNavigate, useParams } from "react-router";
import Swal from "sweetalert2";
import Lottie from "lottie-react";
import errorPageJSON from "../../assets/error.json";
import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../../context/AuthContextProvider";

const eventTypes = ["Swimming", "Sprinting", "Long Jump", "High Jump", "Hurdle Race"];
const difficultyLevels = ["Beginner", "Intermediate", "Advanced"];

function UpdateEvent() {
    const { user } = useContext(AuthContext);
    const { id } = useParams();
    const navigate = useNavigate();
    const eventdata = useLoaderData();

    // Error page if event not found
    if (!eventdata || id !== eventdata._id) {
        return (
            <div className="h-screen flex flex-col items-center justify-center bg-white dark:bg-gray-900 px-4 text-center">
                <Lottie style={{ width: 300 }} animationData={errorPageJSON} loop />
                <h2 className="text-2xl md:text-3xl font-semibold text-gray-800 dark:text-gray-100 mb-2">
                    Your event could not be found
                </h2>
                <p className="text-gray-600 dark:text-gray-300 mb-6">
                    Please check the URL or go back to the homepage.
                </p>
                <Link
                    to="/"
                    className="px-6 py-2 bg-blue-700 text-white rounded-lg hover:bg-blue-800 transition"
                >
                    Go Home
                </Link>
            </div>
        );
    }

    const [formData, setFormData] = useState({
        name: "",
        type: "",
        difficulty: "",
        description: "",
        pictureUrl: "",
        athleticCategory: "",
        contactNumber: "",
        date: "",
        price: "",
        userName: user?.displayName || "",
        userEmail: user?.email || "",
    });

    // Initialize form data
    useEffect(() => {
        if (eventdata) {
            setFormData({
                name: eventdata.name || "",
                type: eventdata.type || "",
                difficulty: eventdata.difficulty || "",
                description: eventdata.description || "",
                pictureUrl: eventdata.pictureUrl || "",
                athleticCategory: eventdata.athleticCategory || "",
                contactNumber: eventdata.contactNumber || "",
                date: eventdata.date ? eventdata.date.split("T")[0] : "",
                price: eventdata.price || "",
                userName: user?.displayName || "",
                userEmail: user?.email || "",
            });
        }
    }, [eventdata, user]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const updatedData = {
            ...formData,
            price: parseInt(formData.price, 10),
            date: new Date(formData.date),
        };

        try {
            const res = await fetch(`https://athletic-server.vercel.app/events/${id}`, {
                method: "PUT",
                headers: { "content-type": "application/json" },
                body: JSON.stringify(updatedData),
            });
            const data = await res.json();
            if (data.modifiedCount) {
                Swal.fire({
                    icon: "success",
                    title: "Event updated successfully.",
                    showConfirmButton: false,
                    timer: 1500,
                });
                navigate("/manageEvent");
            }
        } catch (error) {
            console.error(error);
            Swal.fire({ icon: "error", title: "Update failed", text: error.message });
        }
    };

    return (
        <section className="max-w-2xl mx-auto p-6 bg-white dark:bg-gray-800 rounded-xl shadow my-10">
            <h2 className="text-2xl text-center font-bold mb-6 text-primary">
                Update Event
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <Input label="Event Name" name="name" value={formData.name} onChange={handleChange} required />
                <Select label="Event Type" name="type" options={eventTypes} value={formData.type} onChange={handleChange} required />
                <Input label="Event Date" name="date" type="date" value={formData.date} onChange={handleChange} required />
                <Input label="Price" name="price" type="number" min="0" value={formData.price} onChange={handleChange} required />
                <Select label="Difficulty" name="difficulty" options={difficultyLevels} value={formData.difficulty} onChange={handleChange} required />
                <Textarea label="Description" name="description" value={formData.description} onChange={handleChange} />
                <Input label="Image URL" name="pictureUrl" type="url" value={formData.pictureUrl} onChange={handleChange} />
                <Input label="Category" name="athleticCategory" value={formData.athleticCategory} onChange={handleChange} />
                <Input label="Contact Number" name="contactNumber" value={formData.contactNumber} onChange={handleChange} />
                <Input label="Creator Name" name="userName" value={formData.userName} readOnly />
                <Input label="Creator Email" name="userEmail" value={formData.userEmail} readOnly />

                <button
                    type="submit"
                    className="w-full bg-primary text-white font-medium px-4 py-2 rounded hover:bg-primary/85 transition"
                >
                    Update Event
                </button>
            </form>
        </section>
    );
}

// Reusable Input Component
const Input = ({ label, name, type = "text", value, onChange, readOnly, required, min }) => (
    <div>
        <label className="block font-medium text-gray-700 dark:text-gray-200">{label}</label>
        <input
            type={type}
            name={name}
            value={value}
            onChange={onChange}
            readOnly={readOnly}
            min={min}
            required={required}
            className="w-full border rounded p-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
        />
    </div>
);

// Reusable Textarea Component
const Textarea = ({ label, name, value, onChange, rows = 4 }) => (
    <div>
        <label className="block font-medium text-gray-700 dark:text-gray-200">{label}</label>
        <textarea
            name={name}
            value={value}
            onChange={onChange}
            rows={rows}
            className="w-full border rounded p-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
        />
    </div>
);

// Reusable Select Component
const Select = ({ label, name, options, value, onChange, required }) => (
    <div>
        <label className="block font-medium text-gray-700 dark:text-gray-200">{label}</label>
        <select
            name={name}
            value={value}
            onChange={onChange}
            required={required}
            className="w-full border rounded p-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
        >
            <option value="">-- Select --</option>
            {options.map((opt) => (
                <option key={opt} value={opt}>{opt}</option>
            ))}
        </select>
    </div>
);

export default UpdateEvent;
