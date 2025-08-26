import React, { useContext, useEffect, useState } from "react";
import useAxiosSecureApi from "../hooks/useAxiosSecureApi";
import { AuthContext } from "../../context/AuthContextProvider";
import { toast } from "react-toastify";
import Loading from "../shared/Loading";

function Profile() {
    const axiosSecure = useAxiosSecureApi();
    const { user, updateProfileUser } = useContext(AuthContext);

    const [userData, setUserData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [editing, setEditing] = useState(false);
    const [formData, setFormData] = useState({
        name: "",
        photoURL: "",
        bio: "",
        phone: "",
        address: "",
    });

    useEffect(() => {
        if (!user) return;
        setLoading(true);

        axiosSecure
            .get(`/users?search=${user.email}`)
            .then((res) => {
                const fetchedUser = Array.isArray(res.data)
                    ? res.data.find((u) => u.email === user.email)
                    : res.data;

                if (fetchedUser) {
                    setUserData(fetchedUser);
                    setFormData({
                        name: fetchedUser.name || "",
                        photoURL: fetchedUser.photoURL || "",
                        bio: fetchedUser.bio || "",
                        phone: fetchedUser.phone || "",
                        address: fetchedUser.address || "",
                    });
                } else setError("User not found");
            })
            .catch(() => setError("Failed to fetch user data"))
            .finally(() => setLoading(false));
    }, [user, axiosSecure]);

    const formatDate = (isoString) =>
        isoString ? new Date(isoString).toLocaleString() : "N/A";

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleEditClick = () => setEditing(true);

    const handleCancel = () => {
        if (userData) {
            setFormData({
                name: userData.name || "",
                photoURL: userData.photoURL || "",
                bio: userData.bio || "",
                phone: userData.phone || "",
                address: userData.address || "",
            });
        }
        setEditing(false);
    };

    const handleSave = () => {
        if (!userData?._id) return toast.error("User ID missing");

        axiosSecure
            .patch(`/users/${userData._id}`, formData)
            .then((res) => {
                if (res.data.modifiedCount || res.data.matchedCount) {
                    toast.success("Profile updated successfully");
                    setUserData((prev) => ({ ...prev, ...formData }));
                    setEditing(false);

                    updateProfileUser({ displayName: formData.name, photoURL: formData.photoURL })
                        .then(() => toast.success(`Welcome, ${formData.name}`))
                        .catch(() => toast.error("Failed to update auth profile"));
                } else toast.info("No changes made");
            })
            .catch(() => toast.error("Error updating profile"));
    };

    if (loading) return <Loading></Loading>;
    if (error) return <p className="text-center py-20 text-red-600">{error}</p>;
    if (!userData) return <p className="text-center py-20 text-gray-500">No data available</p>;

    const { name, email, photoURL, role, created_at, last_log_in } = userData;

    return (
        <section
            className="max-w-xl mx-auto p-6 bg-base-100 rounded-3xl shadow-2xl my-10"
            style={{ position: "relative" }}
        >
            <h2 className="text-4xl font-bold text-center text-primary mb-10">Profile</h2>

            {!editing ? (
                <>
                    {/* Profile Image */}
                    <div
                        style={{
                            textAlign: "center",
                            marginBottom: "2rem",
                            position: "relative",
                        }}
                    >
                        {photoURL ? (
                            <img
                                src={photoURL}
                                alt={name}
                                style={{
                                    width: "180px",
                                    height: "180px",
                                    borderRadius: "50%",
                                    border: "5px solid #262261",
                                    boxShadow: "0 4px 15px rgba(0,0,0,0.2)",
                                    display: "inline-block",
                                }}
                            />
                        ) : (
                            <div
                                style={{
                                    width: "180px",
                                    height: "180px",
                                    borderRadius: "50%",
                                    backgroundColor: "#f3f4f6",
                                    display: "inline-block",
                                    textAlign: "center",
                                    lineHeight: "180px",
                                    fontSize: "1.2rem",
                                    fontWeight: "bold",
                                    color: "#9ca3af",
                                    border: "5px solid #262261",
                                    boxShadow: "0 4px 15px rgba(0,0,0,0.2)",
                                }}
                            >
                                No Photo
                            </div>
                        )}
                    </div>

                    {/* Basic Info */}
                    <div
                        style={{
                            textAlign: "center",
                            marginBottom: "2rem",
                        }}
                    >
                        <h3 style={{ fontSize: "2rem", fontWeight: "bold", color: "#262261" }}>
                            {name || "No Name"}
                        </h3>
                        <p style={{ color: "#f97316", fontSize: "1.1rem" }}>{role || "User"}</p>
                        <p style={{ color: "#4b5563" }}>Email: {email}</p>
                        <p style={{ color: "#6b7280", fontSize: "0.9rem" }}>
                            Created: {formatDate(created_at)}
                        </p>
                        <p style={{ color: "#6b7280", fontSize: "0.9rem" }}>
                            Last Login: {formatDate(last_log_in)}
                        </p>
                    </div>

                    {/* Info Blocks */}
                    <div style={{ marginBottom: "2rem" }}>
                        <div
                            style={{
                                background: "#f3f4f6",
                                padding: "1rem",
                                marginBottom: "1rem",
                                borderRadius: "1rem",
                                boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
                            }}
                        >
                            <strong>Bio:</strong> {userData.bio || "No bio set"}
                        </div>
                        <div
                            style={{
                                background: "#f3f4f6",
                                padding: "1rem",
                                marginBottom: "1rem",
                                borderRadius: "1rem",
                                boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
                            }}
                        >
                            <strong>Phone:</strong> {userData.phone || "No phone set"}
                        </div>
                        <div
                            style={{
                                background: "#f3f4f6",
                                padding: "1rem",
                                marginBottom: "1rem",
                                borderRadius: "1rem",
                                boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
                            }}
                        >
                            <strong>Address:</strong> {userData.address || "No address set"}
                        </div>
                    </div>

                    {/* Edit Button */}
                    <div style={{ textAlign: "center" }}>
                        <button
                            onClick={handleEditClick}
                            className="bg-primary text-white px-6 py-2 rounded-full font-semibold cursor-pointer hover:bg-secondary transition"
                        >
                            Edit Profile
                        </button>
                    </div>
                </>
            ) : (
                // Edit Form
                <form
                    onSubmit={(e) => {
                        e.preventDefault();
                        handleSave();
                    }}
                >
                    <div style={{ marginBottom: "1rem" }}>
                        <input
                            name="name"
                            value={formData.name}
                            onChange={handleInputChange}
                            type="text"
                            placeholder="Name"
                            style={{
                                width: "100%",
                                padding: "0.75rem",
                                borderRadius: "1rem",
                                border: "1px solid #e5e7eb",
                                marginBottom: "0.5rem",
                            }}
                            required
                        />
                        <input
                            name="photoURL"
                            value={formData.photoURL}
                            onChange={handleInputChange}
                            type="url"
                            placeholder="Photo URL"
                            style={{
                                width: "100%",
                                padding: "0.75rem",
                                borderRadius: "1rem",
                                border: "1px solid #e5e7eb",
                            }}
                        />
                    </div>

                    <div style={{ marginBottom: "1rem" }}>
                        <textarea
                            name="bio"
                            value={formData.bio}
                            onChange={handleInputChange}
                            placeholder="Bio"
                            rows={3}
                            style={{
                                width: "100%",
                                padding: "0.75rem",
                                borderRadius: "1rem",
                                border: "1px solid #e5e7eb",
                            }}
                        />
                    </div>

                    <div style={{ marginBottom: "1rem" }}>
                        <input
                            name="phone"
                            value={formData.phone}
                            onChange={handleInputChange}
                            type="text"
                            placeholder="Phone"
                            style={{
                                width: "100%",
                                padding: "0.75rem",
                                borderRadius: "1rem",
                                border: "1px solid #e5e7eb",
                                marginBottom: "0.5rem",
                            }}
                        />
                        <input
                            name="address"
                            value={formData.address}
                            onChange={handleInputChange}
                            type="text"
                            placeholder="Address"
                            style={{
                                width: "100%",
                                padding: "0.75rem",
                                borderRadius: "1rem",
                                border: "1px solid #e5e7eb",
                            }}
                        />
                    </div>

                    <div style={{ textAlign: "center", marginTop: "1rem" }}>
                        <button
                            type="submit"
                            className="bg-primary text-primary-content px-6 py-2 rounded-full font-semibold cursor-pointer hover:bg-secondary transition mr-4"
                        >
                            Save
                        </button>
                        <button
                            type="button"
                            onClick={handleCancel}
                            className="bg-secondary text-secondary-content px-6 py-2 rounded-full font-semibold cursor-pointer hover:bg-primary transition"
                        >
                            Cancel
                        </button>
                    </div>
                </form>
            )}
        </section>
    );
}

export default Profile;
