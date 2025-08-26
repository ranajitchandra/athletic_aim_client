import { useContext, useState, useEffect } from "react";
import { AuthContext } from "../../context/AuthContextProvider";
import axios from "axios";
import Swal from "sweetalert2";

export default function AddEventForm({ eventdata }) {
    const { user } = useContext(AuthContext);

    const eventTypes = ["Swimming", "Sprinting", "Long Jump", "High Jump", "Hurdle Race"];
    const athleticCategories = ["Track", "Field", "Indoor", "Outdoor", "Relay"];
    const difficultyLevels = ["Beginner", "Intermediate", "Advanced"];

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
        price: "",
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
                price: eventdata.price || "",
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
                .put(`https://athletic-server.vercel.app/events/${eventdata._id}`, cleanData)
                .then((response) => {
                    if (response.data.modifiedCount) {
                        Swal.fire({
                            title: "Event Updated Successfully",
                            icon: "success",
                        });
                    }
                })
                .catch((error) => console.error(error));
        } else {
            // Create
            axios
                .post("https://athletic-server.vercel.app/addEvent", cleanData)
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
                            price: "",
                        });
                    }
                })
                .catch((error) => console.error(error));
        }
    };

    // **Reusable theme-aware input classes**
    const inputClass =
        "w-full border rounded-xl p-3 text-base-content placeholder:text-base-content/50 bg-base-100 focus:outline-none focus:ring-2 focus:ring-secondary transition";

    return (
        <section className="max-w-2xl mx-auto p-6 bg-base-200 rounded-2xl shadow-lg my-10">
            <h2 className="text-2xl text-center font-bold mb-6 text-primary">
                {eventdata ? "Update Event" : "Create New Event"}
            </h2>

            <form onSubmit={handleSubmit} className="space-y-4">
                {/* Event Name */}
                <div>
                    <label className="block font-medium mb-1">Event Name</label>
                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Enter event name"
                        className={inputClass}
                        required
                    />
                </div>

                {/* Event Type */}
                <div>
                    <label className="block font-medium mb-1">Event Type</label>
                    <select
                        name="type"
                        value={formData.type}
                        onChange={handleChange}
                        className={inputClass}
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
                    <label className="block font-medium mb-1">Event Date</label>
                    <input
                        type="date"
                        name="date"
                        value={formData.date}
                        onChange={handleChange}
                        className={inputClass}
                        required
                    />
                </div>

                {/* Price */}
                <div>
                    <label className="block font-medium mb-1">Price</label>
                    <input
                        type="number"
                        name="price"
                        value={formData.price}
                        onChange={handleChange}
                        placeholder="Enter price (in USD)"
                        className={inputClass}
                        min="0"
                        step="0.01"
                        required
                    />
                </div>

                {/* Venue */}
                <div>
                    <label className="block font-medium mb-1">Venue</label>
                    <input
                        type="text"
                        name="venue"
                        value={formData.venue}
                        onChange={handleChange}
                        placeholder="Enter venue/location"
                        className={inputClass}
                        required
                    />
                </div>

                {/* Description */}
                <div>
                    <label className="block font-medium mb-1">Description</label>
                    <textarea
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        placeholder="Enter event description"
                        className={inputClass}
                        rows={4}
                    ></textarea>
                </div>

                {/* Picture URL */}
                <div>
                    <label className="block font-medium mb-1">Event Picture URL</label>
                    <input
                        type="url"
                        name="pictureUrl"
                        value={formData.pictureUrl}
                        onChange={handleChange}
                        placeholder="Enter image URL"
                        className={inputClass}
                    />
                </div>

                {/* Athletic Category */}
                <div>
                    <label className="block font-medium mb-1">Athletic Category</label>
                    <select
                        name="athleticCategory"
                        value={formData.athleticCategory}
                        onChange={handleChange}
                        className={inputClass}
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
                    <label className="block font-medium mb-1">Contact Number</label>
                    <input
                        type="text"
                        name="contactNumber"
                        value={formData.contactNumber}
                        onChange={handleChange}
                        placeholder="Enter contact number"
                        className={inputClass}
                        required
                    />
                </div>

                {/* Difficulty */}
                <div>
                    <label className="block font-medium mb-1">Difficulty Level</label>
                    <select
                        name="difficulty"
                        value={formData.difficulty}
                        onChange={handleChange}
                        className={inputClass}
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
                    <label className="block font-medium mb-1">Creator Email</label>
                    <input
                        type="email"
                        name="creatorEmail"
                        value={formData.creatorEmail}
                        readOnly
                        className={`${inputClass} bg-base-300 cursor-not-allowed`}
                    />
                </div>

                <div>
                    <label className="block font-medium mb-1">Creator Name</label>
                    <input
                        type="text"
                        name="creatorName"
                        value={formData.creatorName}
                        readOnly
                        className={`${inputClass} bg-base-300 cursor-not-allowed`}
                    />
                </div>

                <button
                    type="submit"
                    className="w-full py-3 bg-primary text-white font-medium rounded-xl hover:bg-primary/85 transition"
                >
                    {eventdata ? "Update Event" : "Create Event"}
                </button>
            </form>
        </section>
    );
}
