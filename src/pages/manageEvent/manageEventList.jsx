import React, { use, useContext, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FiEdit, FiTrash2 } from "react-icons/fi";
import { AuthContext } from "../../context/AuthContextProvider";
import Loading from "../shared/Loading";
import Swal from "sweetalert2";
import { useNavigate } from "react-router";

export default function ManageEventList({ myEventPromise }) {
    const { user } = useContext(AuthContext);
    const navigate = useNavigate()

    const eventsData = use(myEventPromise);
    const [viewMode, setViewMode] = useState("table"); // table | card

    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (user?.email && eventsData?.length) {
            setEvents(eventsData.filter(item => item.creatorEmail === user.email));
            setLoading(false);
        }
    }, [user?.email, eventsData]);

    const handleDelete = (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {
                fetch(`http://localhost:3000/events/${id}`, {
                    method: 'DELETE'
                })
                    .then(res => res.json())
                    .then(data => {
                        if (data.deletedCount) {
                            Swal.fire({
                                title: "Deleted!",
                                text: "Event has been deleted.",
                                icon: "success"
                            });

                            const remainingEvents = events.filter(event => event._id !== id);
                            setEvents(remainingEvents);
                        }
                    });
            }
        });
    };

    if (loading) {
        return <Loading />;
    }

    const handleUpdate = (id) => {
        console.log("Update event", id);
        navigate(`/updateEvent/${id}`)
    };

    return (
        <div>
            {/* Toggle button */}
            <div className="grid grid-cols-3 items-center my-8">
                <div></div>
                <h2 className="text-center text-2xl font-bold">My Posted Event</h2>
                <div className="flex justify-end m-4">
                    <button
                        onClick={() => setViewMode(viewMode === "table" ? "card" : "table")}
                        className="px-4 py-2 bg-[var(--color-secondary)] text-white rounded hover:bg-secondary/85 transition"
                    >
                        Switch to {viewMode === "table" ? "Card" : "Table"} View
                    </button>
                </div>
            </div>

            {viewMode === "table" ? (
                <div className="overflow-x-auto">
                    <table className="min-w-full border-collapse border border-gray-300">
                        <thead>
                            <tr className="bg-[var(--color-secondary)] text-white">
                                <th className="border border-gray-300 p-2 text-left">#</th>
                                <th className="border border-gray-300 p-2 text-left">Name</th>
                                <th className="border border-gray-300 p-2 text-left">Type</th>
                                <th className="border border-gray-300 p-2 text-left">Date</th>
                                <th className="border border-gray-300 p-2 text-left">Venue</th>
                                <th className="border border-gray-300 p-2 text-left">Description</th>
                                <th className="border border-gray-300 p-2 text-left">Creator Email</th>
                                <th className="border border-gray-300 p-2 text-left">Category</th>
                                <th className="border border-gray-300 p-2 text-left">Contact</th>
                                <th className="border border-gray-300 p-2 text-left">Difficulty</th>
                                <th className="border border-gray-300 p-2 text-left">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {events.map((event, i) => (
                                <motion.tr
                                    key={event._id}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: i * 0.05 }}
                                    whileHover={{ cursor: "pointer" }}
                                >
                                    <td className="border border-gray-300 p-2">{i + 1}</td>
                                    <td className="border border-gray-300 p-2 font-semibold text-[var(--color-secondary)]">
                                        {event.name}
                                    </td>
                                    <td className="border border-gray-300 p-2">{event.type}</td>
                                    <td className="border border-gray-300 p-2">{event.date}</td>
                                    <td className="border border-gray-300 p-2">{event.venue}</td>
                                    <td className="border border-gray-300 p-2 max-w-xs truncate" title={event.description}>
                                        {event.description}
                                    </td>
                                    <td className="border border-gray-300 p-2">{event.creatorEmail}</td>
                                    <td className="border border-gray-300 p-2">{event.athleticCategory}</td>
                                    <td className="border border-gray-300 p-2">{event.contactNumber}</td>
                                    <td className="border border-gray-300 p-2">{event.difficulty}</td>
                                    <td className="border border-gray-300 p-2 flex items-center gap-4 mt-3">
                                        <button
                                            onClick={() => handleUpdate(event._id)}
                                            className="text-blue-600 hover:text-blue-800"
                                        >
                                            <FiEdit size={22} />
                                        </button>
                                        <button
                                            onClick={() => handleDelete(event._id)}
                                            className="text-red-600 hover:text-red-800"
                                        >
                                            <FiTrash2 size={22} />
                                        </button>
                                    </td>
                                </motion.tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
                    {events.map((event, i) => (
                        <motion.div
                            key={event._id}
                            className="bg-white rounded-xl shadow-md p-4 border hover:shadow-lg transition"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.05 }}
                        >
                            <h3 className="text-lg font-bold text-[var(--color-secondary)]">
                                {event.name}
                            </h3>
                            <p className="text-sm text-gray-600">{event.type} • {event.date}</p>
                            <p className="mt-2">{event.description}</p>
                            <div className="mt-2 text-sm">
                                <p><span className="font-semibold">Venue:</span> {event.venue}</p>
                                <p><span className="font-semibold">Creator:</span> {event.creatorEmail}</p>
                                <p><span className="font-semibold">Category:</span> {event.athleticCategory}</p>
                                <p><span className="font-semibold">Contact:</span> {event.contactNumber}</p>
                                <p><span className="font-semibold">Difficulty:</span> {event.difficulty}</p>
                            </div>
                            <div className="flex gap-2 mt-4">
                                <button
                                    onClick={() => handleUpdate(event._id)}
                                    className="px-3 py-1 flex items-center gap-1 bg-blue-600 text-white rounded hover:bg-blue-700"
                                >
                                    <FiEdit /> Edit
                                </button>
                                <button
                                    onClick={() => handleDelete(event._id)}
                                    className="px-3 py-1 flex items-center gap-1 bg-red-600 text-white rounded hover:bg-red-700"
                                >
                                    <FiTrash2 /> Delete
                                </button>
                            </div>
                        </motion.div>
                    ))}
                </div>
            )}
        </div>
    );
}
