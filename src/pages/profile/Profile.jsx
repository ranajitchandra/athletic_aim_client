import React, { useContext, useEffect, useState } from "react";
import useAxiosSecureApi from "../hooks/useAxiosSecureApi";
import { AuthContext } from "../../context/AuthContextProvider";
import { toast } from "react-toastify";

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
                } else {
                    setError("User not found");
                }
            })
            .catch(() => setError("Failed to fetch user data"))
            .finally(() => setLoading(false));
    }, [user, axiosSecure]);

    const formatDate = (isoString) => {
        if (!isoString) return "N/A";
        return new Date(isoString).toLocaleString();
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleEditClick = () => {
        setEditing(true);
    };

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
        if (!userData?._id) {
            toast.error("User ID missing, cannot update");
            return;
        }

        const updatePayload = {
            name: formData.name,
            photoURL: formData.photoURL,
            bio: formData.bio,
            phone: formData.phone,
            address: formData.address,
        };

        axiosSecure
            .patch(`/users/${userData._id}`, updatePayload)
            .then((res) => {
                if (res.data.modifiedCount || res.data.matchedCount) {
                    toast.success("Profile updated successfully");
                    setUserData((prev) => ({ ...prev, ...updatePayload }));
                    setEditing(false);

                    // Also update auth context user profile if you want
                    const userUpdateData = {
                        displayName: formData.name,
                        photoURL: formData.photoURL,
                    };

                    updateProfileUser(userUpdateData)
                        .then(() => {
                            toast.success(`Welcome, ${userUpdateData.displayName}`);
                        })
                        .catch(() => {
                            toast.error("Failed to update auth profile");
                        });

                } else {
                    toast.info("No changes made or update failed");
                }
            })
            .catch(() => toast.error("Error updating profile"));
    };

    if (loading) return <p>Loading user data...</p>;
    if (error) return <p className="text-red-600">{error}</p>;
    if (!userData) return <p>No user data available.</p>;

    const { name, email, photoURL, role, created_at, last_log_in } = userData;

    return (
        <section className="max-w-md mx-auto p-6 border rounded bg-white my-10 shadow-2xl">
            <h2 className="text-2xl font-bold mb-6 text-center">User Profile</h2>

            {!editing ? (
                <>
                    <div className="flex flex-col items-center mb-6">
                        {photoURL ? (
                            <img
                                src={photoURL}
                                alt={name}
                                className="w-32 h-32 rounded-full object-cover mb-4"
                            />
                        ) : (
                            <div className="w-32 h-32 rounded-full bg-gray-200 flex items-center justify-center text-gray-500 mb-4">
                                No Photo
                            </div>
                        )}
                        <h3 className="text-xl font-semibold">{name || "No Name"}</h3>
                    </div>

                    <div className="space-y-3 text-gray-700 mb-6">
                        <p>
                            <strong>Email:</strong> {email || "N/A"}
                        </p>
                        <p>
                            <strong>Role:</strong> {role || "N/A"}
                        </p>
                        <p>
                            <strong>Created At:</strong> {formatDate(created_at)}
                        </p>
                        <p>
                            <strong>Last Login:</strong> {formatDate(last_log_in)}
                        </p>
                        <p>
                            <strong>Bio:</strong> {userData.bio || <i>No bio set</i>}
                        </p>
                        <p>
                            <strong>Phone:</strong> {userData.phone || <i>No phone set</i>}
                        </p>
                        <p>
                            <strong>Address:</strong> {userData.address || <i>No address set</i>}
                        </p>
                    </div>

                    <button
                        onClick={handleEditClick}
                        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
                    >
                        Edit Profile
                    </button>
                </>
            ) : (
                <form
                    onSubmit={(e) => {
                        e.preventDefault();
                        handleSave();
                    }}
                    className="space-y-4"
                >
                    <div>
                        <label className="block font-medium mb-1">Name</label>
                        <input
                            name="name"
                            value={formData.name}
                            onChange={handleInputChange}
                            type="text"
                            className="w-full border p-2 rounded"
                            required
                        />
                    </div>

                    <div>
                        <label className="block font-medium mb-1">Photo URL</label>
                        <input
                            name="photoURL"
                            value={formData.photoURL}
                            onChange={handleInputChange}
                            type="url"
                            className="w-full border p-2 rounded"
                        />
                    </div>

                    <div>
                        <label className="block font-medium mb-1">Bio</label>
                        <textarea
                            name="bio"
                            value={formData.bio}
                            onChange={handleInputChange}
                            className="w-full border p-2 rounded"
                            rows={3}
                        />
                    </div>

                    <div>
                        <label className="block font-medium mb-1">Phone</label>
                        <input
                            name="phone"
                            value={formData.phone}
                            onChange={handleInputChange}
                            type="text"
                            className="w-full border p-2 rounded"
                        />
                    </div>

                    <div>
                        <label className="block font-medium mb-1">Address</label>
                        <input
                            name="address"
                            value={formData.address}
                            onChange={handleInputChange}
                            type="text"
                            className="w-full border p-2 rounded"
                        />
                    </div>

                    <div className="flex gap-3">
                        <button
                            type="submit"
                            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition"
                        >
                            Save
                        </button>
                        <button
                            type="button"
                            onClick={handleCancel}
                            className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400"
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
