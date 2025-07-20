import { Link, useLoaderData, useNavigate } from "react-router";
import Swal from "sweetalert2";
import Lottie from "lottie-react";
import errorPageJSON from "../../assets/error.json";
import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../../context/AuthContextProvider";

function UpdateEvent() {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const eventdata = useLoaderData();

  if (eventdata?.error) {
    return (
      <div className="h-screen flex flex-col items-center justify-center bg-white px-4 text-center">
        <Lottie style={{ width: "300px" }} animationData={errorPageJSON} loop />
        <h2 className="text-2xl md:text-3xl font-semibold text-gray-800 mb-2">
          Your event could not be found
        </h2>
        <p className="text-gray-600 mb-6">
          Please check the URL or go back to the homepage.
        </p>
        <Link
          to="/"
          className="px-6 py-2 bg-blue-700 text-white rounded-lg hover:bg-secondary transition"
        >
          Go Home
        </Link>
      </div>
    );
  }

  const {
    _id,
    name,
    type,
    date,
    venue,
    description,
    pictureUrl,
    athleticCategory,
    contactNumber,
    difficulty,
    userName,
    userEmail,
  } = eventdata;

  const [formData, setFormData] = useState({
    name: "",
    type: "",
    difficulty: "",
    description: "",
    pictureUrl: "",
    athleticCategory: "",
    contactNumber: "",
    userName: "",
    userEmail: "",
  });

  // Set event data when eventdata changes (without user info)
  useEffect(() => {
    setFormData((prev) => ({
      ...prev,
      name,
      type,
      difficulty,
      description,
      pictureUrl,
      athleticCategory,
      contactNumber,
    }));
  }, [eventdata]);

  // Update userName and userEmail when user info becomes available
  useEffect(() => {
    if (user?.displayName && user?.email) {
      setFormData((prev) => ({
        ...prev,
        userName: user.displayName,
        userEmail: user.email,
      }));
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    fetch(`http://localhost:3000/events/${_id}`, {
      method: "PUT",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.modifiedCount) {
          Swal.fire({
            icon: "success",
            title: "Event updated successfully.",
            showConfirmButton: false,
            timer: 1500,
          });
          navigate("/manageEvent");
        }
      });
  };

  return (
    <section className="max-w-2xl mx-auto p-6 bg-white rounded shadow my-10">
      <h2 className="text-2xl text-center font-bold mb-4 text-indigo-800">
        Update Event
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
            className="w-full border rounded p-2"
            required
          />
        </div>

        {/* Event Type */}
        <div>
          <label className="block font-medium text-gray-700">Event Type</label>
          <input
            type="text"
            name="type"
            value={formData.type}
            onChange={handleChange}
            className="w-full border rounded p-2"
            required
          />
        </div>

        {/* Difficulty */}
        <div>
          <label className="block font-medium text-gray-700">Difficulty</label>
          <input
            type="text"
            name="difficulty"
            value={formData.difficulty}
            onChange={handleChange}
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
            className="w-full border rounded p-2"
            rows={4}
          ></textarea>
        </div>

        {/* Image URL */}
        <div>
          <label className="block font-medium text-gray-700">Image URL</label>
          <input
            type="url"
            name="pictureUrl"
            value={formData.pictureUrl}
            onChange={handleChange}
            className="w-full border rounded p-2"
          />
        </div>

        {/* Category */}
        <div>
          <label className="block font-medium text-gray-700">Category</label>
          <input
            type="text"
            name="athleticCategory"
            value={formData.athleticCategory}
            onChange={handleChange}
            className="w-full border rounded p-2"
          />
        </div>

        {/* Contact Number */}
        <div>
          <label className="block font-medium text-gray-700">Contact Number</label>
          <input
            type="text"
            name="contactNumber"
            value={formData.contactNumber}
            onChange={handleChange}
            className="w-full border rounded p-2"
          />
        </div>

        {/* Creator Info */}
        <div>
          <label className="block font-medium text-gray-700">Creator Name</label>
          <input
            type="text"
            name="userName"
            value={formData.userName}
            readOnly
            className="w-full border rounded p-2 bg-gray-100"
          />
        </div>

        <div>
          <label className="block font-medium text-gray-700">Creator Email</label>
          <input
            type="email"
            name="userEmail"
            value={formData.userEmail}
            readOnly
            className="w-full border rounded p-2 bg-gray-100"
          />
        </div>

        <button
          type="submit"
          className="bg-primary text-white font-medium px-4 py-2 rounded hover:bg-primary/85 cursor-pointer"
        >
          Update Event
        </button>
      </form>
    </section>
  );
}

export default UpdateEvent;
