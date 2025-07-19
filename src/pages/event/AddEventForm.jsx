import { useContext, useState, useEffect } from "react";
import { AuthContext } from "../../context/AuthContextProvider";
import axios from "axios";

export default function AddEventForm() {
    const { user } = useContext(AuthContext);

    const eventTypes = [
        "Swimming",
        "Sprinting",
        "Long Jump",
        "High Jump",
        "Hurdle Race",
    ];

    const [formData, setFormData] = useState({
        name: "",
        type: eventTypes[0],
        date: "",
        description: "",
        creatorEmail: "",
        creatorName: "",
        pictureUrl: "",
    });

    // Populate creator info when user is available
    useEffect(() => {
        if (user) {
            setFormData((prev) => ({
                ...prev,
                creatorEmail: user.email || "",
                creatorName: user.displayName || "",
            }));
        }
    }, [user]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };
    const handleSubmit = (e) => {
        e.preventDefault();

        // Create a trimmed copy of formData
        const cleanData = {
            ...formData,
            name: formData.name.trim(),
            type: formData.type.trim(),
            date: formData.date.trim(),
            description: formData.description.trim(),
            creatorEmail: formData.creatorEmail.trim(),
            creatorName: formData.creatorName.trim(),
            pictureUrl: formData.pictureUrl.trim(),
        };

        console.log(cleanData);
        // TODO: Send trimmedData to backend

        axios.post('https://job-portal-server-beta-cyan.vercel.app/addevent', cleanedData)
            .then(function (response) {
                console.log(response.data);
                if (response.data.insertedId) {
                    Swal.fire({
                        title: "Job Submit Successful",
                        icon: "success",
                        draggable: true
                    });

                }
            })
            .catch(function (error) {
                console.log(error);
            });
    };


    return (
        <section className="max-w-2xl mx-auto p-6 bg-white rounded shadow my-10">
            <h2 className="text-2xl text-center font-bold mb-4 text-indigo-800">
                Create New Event
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                {/* Event Name */}
                <div>
                    <label className="block font-medium text-gray-700">Event Name</label>
                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full border border-gray-300 rounded p-2"
                        required
                    />
                </div>

                {/* Event Type */}
                <div>
                    <label className="block font-medium text-gray-700">Event Type</label>
                    <select
                        name="type"
                        value={formData.type}
                        onChange={handleChange}
                        className="w-full border border-gray-300 rounded p-2"
                    >
                        {eventTypes.map((type) => (
                            <option key={type} value={type}>
                                {type}
                            </option>
                        ))}
                    </select>
                </div>

                {/* Event Date */}
                <div>
                    <label className="block font-medium text-gray-700">Event Date</label>
                    <input
                        type="date"
                        name="date"
                        value={formData.date}
                        onChange={handleChange}
                        className="w-full border border-gray-300 rounded p-2"
                        required
                    />
                </div>

                {/* Description */}
                <div>
                    <label className="block font-medium text-gray-700">Description</label>
                    <textarea
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        className="w-full border border-gray-300 rounded p-2"
                        rows={4}
                    ></textarea>
                </div>

                {/* Picture URL */}
                <div>
                    <label className="block font-medium text-gray-700">
                        Event Picture URL
                    </label>
                    <input
                        type="url"
                        name="pictureUrl"
                        value={formData.pictureUrl}
                        onChange={handleChange}
                        className="w-full border border-gray-300 rounded p-2"
                    />
                </div>

                {/* Creator Email */}
                <div>
                    <label className="block font-medium text-gray-700">
                        Creator Email
                    </label>
                    <input
                        type="email"
                        name="creatorEmail"
                        value={formData.creatorEmail}
                        readOnly
                        className="w-full border border-gray-300 rounded p-2 bg-gray-100"
                    />
                </div>

                {/* Creator Name */}
                <div>
                    <label className="block font-medium text-gray-700">
                        Creator Name
                    </label>
                    <input
                        type="text"
                        name="creatorName"
                        value={formData.creatorName}
                        readOnly
                        className="w-full border border-gray-300 rounded p-2 bg-gray-100"
                    />
                </div>

                <button
                    type="submit"
                    className="bg-primary text-white font-medium px-4 py-2 rounded hover:bg-primary/85 cursor-pointer"
                >
                    Create Event
                </button>
            </form>
        </section>
    );
}
