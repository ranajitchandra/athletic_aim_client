import { useContext, useState, useEffect } from "react";
import { AuthContext } from "../../context/AuthContextProvider";
import axios from "axios";
import Swal from "sweetalert2";

export default function AddEventForm({ eventdata }) {
    const { user } = useContext(AuthContext);

    const eventTypes = [
        "Swimming",
        "Sprinting",
        "Long Jump",
        "High Jump",
        "Hurdle Race",
    ];

    const athleticCategories = [
        "Track",
        "Field",
        "Indoor",
        "Outdoor",
        "Relay",
    ];

    const difficultyLevels = [
        "Beginner",
        "Intermediate",
        "Advanced",
    ];

    const [formData, setFormData] = useState({
        name: "",
        type: "",
        date: "",
        venue: "",
        description: "",
        creatorEmail: "",
        creatorName: "",
        pictureUrl: "",
        athleticCategory: "",
        contactNumber: "",
        difficulty: "",
    });

    // Initialize creator info
    useEffect(() => {
        if (user) {
            setFormData((prev) => ({
                ...prev,
                creatorEmail: user.email || "",
                creatorName: user.displayName || "",
            }));
        }
    }, [user]);

    // Initialize eventdata (for editing)
    useEffect(() => {
        if (eventdata) {
            setFormData({
                name: eventdata.name || "",
                type: eventdata.type || "",
                date: eventdata.date || "",
                venue: eventdata.venue || "",
                description: eventdata.description || "",
                creatorEmail: eventdata.creatorEmail || user?.email || "",
                creatorName: eventdata.creatorName || user?.displayName || "",
                pictureUrl: eventdata.pictureUrl || "",
                athleticCategory: eventdata.athleticCategory || "",
                contactNumber: eventdata.contactNumber || "",
                difficulty: eventdata.difficulty || "",
            });
        }
    }, [eventdata, user]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const cleanData = {};
        for (const key in formData) {
            cleanData[key] = typeof formData[key] === "string" ? formData[key].trim() : formData[key];
        }

        if (eventdata?._id) {
            // Update
            axios
                .put(`http://localhost:3000/events/${eventdata._id}`, cleanData)
                .then((response) => {
                    if (response.data.modifiedCount) {
                        Swal.fire({
                            title: "Event Updated Successfully",
                            icon: "success",
                        });
                    }
                })
                .catch((error) => {
                    console.error(error);
                });
        } else {
            // Create
            axios
                .post("http://localhost:3000/addEvent", cleanData)
                .then((response) => {
                    if (response.data.insertedId) {
                        Swal.fire({
                            title: "Event Created Successfully",
                            icon: "success",
                        });
                        setFormData({
                            name: "",
                            type: "",
                            date: "",
                            venue: "",
                            description: "",
                            creatorEmail: user?.email || "",
                            creatorName: user?.displayName || "",
                            pictureUrl: "",
                            athleticCategory: "",
                            contactNumber: "",
                            difficulty: "",
                        });
                    }
                })
                .catch((error) => {
                    console.error(error);
                });
        }
    };

    return (
        <section className="max-w-2xl mx-auto p-6 bg-white rounded shadow my-10">
            <h2 className="text-2xl text-center font-bold mb-4 text-indigo-800">
                {eventdata ? "Update Event" : "Create New Event"}
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
                        placeholder="Enter event name"
                        className="w-full border rounded p-2"
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
                        className="w-full border rounded p-2"
                        required
                    >
                        <option value="">-- Select Event Type --</option>
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
                        className="w-full border rounded p-2"
                        required
                    />
                </div>

                {/* Venue */}
                <div>
                    <label className="block font-medium text-gray-700">Venue</label>
                    <input
                        type="text"
                        name="venue"
                        value={formData.venue}
                        onChange={handleChange}
                        placeholder="Enter venue/location"
                        className="w-full border rounded p-2"
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
                        placeholder="Enter event description"
                        className="w-full border rounded p-2"
                        rows={4}
                    ></textarea>
                </div>

                {/* Picture URL */}
                <div>
                    <label className="block font-medium text-gray-700">Event Picture URL</label>
                    <input
                        type="url"
                        name="pictureUrl"
                        value={formData.pictureUrl}
                        onChange={handleChange}
                        placeholder="Enter image URL"
                        className="w-full border rounded p-2"
                    />
                </div>

                {/* Athletic Category */}
                <div>
                    <label className="block font-medium text-gray-700">Athletic Category</label>
                    <select
                        name="athleticCategory"
                        value={formData.athleticCategory}
                        onChange={handleChange}
                        className="w-full border rounded p-2"
                        required
                    >
                        <option value="">-- Select Athletic Category --</option>
                        {athleticCategories.map((cat) => (
                            <option key={cat} value={cat}>
                                {cat}
                            </option>
                        ))}
                    </select>
                </div>

                {/* Contact Number */}
                <div>
                    <label className="block font-medium text-gray-700">Contact Number</label>
                    <input
                        type="text"
                        name="contactNumber"
                        value={formData.contactNumber}
                        onChange={handleChange}
                        placeholder="Enter contact number"
                        className="w-full border rounded p-2"
                        required
                    />
                </div>

                {/* Difficulty */}
                <div>
                    <label className="block font-medium text-gray-700">Difficulty Level</label>
                    <select
                        name="difficulty"
                        value={formData.difficulty}
                        onChange={handleChange}
                        className="w-full border rounded p-2"
                        required
                    >
                        <option value="">-- Select Difficulty Level --</option>
                        {difficultyLevels.map((level) => (
                            <option key={level} value={level}>
                                {level}
                            </option>
                        ))}
                    </select>
                </div>

                {/* Creator Info */}
                <div>
                    <label className="block font-medium text-gray-700">Creator Email</label>
                    <input
                        type="email"
                        name="creatorEmail"
                        value={formData.creatorEmail}
                        readOnly
                        className="w-full border rounded p-2 bg-gray-100"
                    />
                </div>

                <div>
                    <label className="block font-medium text-gray-700">Creator Name</label>
                    <input
                        type="text"
                        name="creatorName"
                        value={formData.creatorName}
                        readOnly
                        className="w-full border rounded p-2 bg-gray-100"
                    />
                </div>

                <button
                    type="submit"
                    className="bg-primary text-white font-medium px-4 py-2 rounded hover:bg-primary/85 cursor-pointer"
                >
                    {eventdata ? "Update Event" : "Create Event"}
                </button>
            </form>
        </section>
    );
}
