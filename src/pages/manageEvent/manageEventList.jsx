import React, { use, useContext, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FiEdit, FiTrash2 } from "react-icons/fi";
import { AuthContext } from "../../context/AuthContextProvider";
import Loading from "../shared/Loading";
import Swal from "sweetalert2";
import { useNavigate } from "react-router";

export default function ManageEventList({ myEventPromise }) {
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();

    const eventsData = use(myEventPromise);
    const [viewMode, setViewMode] = useState("table"); // table | card
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (user?.email && eventsData?.length) {
            setEvents(eventsData.filter((item) => item.creatorEmail === user.email));
            setLoading(false);
        }
    }, [user?.email, eventsData]);

    const handleDelete = (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "var(--color-primary)",
            cancelButtonColor: "var(--color-error)",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {
                fetch(`https://athletic-server.vercel.app/events/${id}`, { method: 'DELETE' })
                    .then(res => res.json())
                    .then(data => {
                        if (data.deletedCount) {
                            Swal.fire({
                                title: "Deleted!",
                                text: "Event has been deleted.",
                                icon: "success"
                            });
                            setEvents(events.filter(event => event._id !== id));
                        }
                    });
            }
        });
    };

    if (loading) return <Loading />;

    const handleUpdate = (id) => navigate(`/updateEvent/${id}`);

    return (
        <div className="px-4 md:px-8">
            {/* Header + toggle */}
            <div className="flex flex-col md:flex-row items-center justify-between my-8 gap-4">
                <h2 className="text-2xl font-bold text-primary">My Posted Events</h2>
                <button
                    onClick={() => setViewMode(viewMode === "table" ? "card" : "table")}
                    className="px-4 py-2 bg-secondary text-white rounded-xl hover:bg-secondary/85 transition"
                >
                    Switch to {viewMode === "table" ? "Card" : "Table"} View
                </button>
            </div>

            {/* Table View */}
            {viewMode === "table" ? (
                <div className="overflow-x-auto rounded-xl shadow-lg border border-base-300">
                    <table className="min-w-full border-collapse">
                        <thead className="bg-primary text-accent-content sticky top-0">
                            <tr>
                                {["#", "Name", "Type", "Date", "Venue", "Category", "Contact", "Difficulty", "Actions"].map((header) => (
                                    <th key={header} className="px-4 py-2 text-left font-medium">{header}</th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {events.map((event, i) => (
                                <motion.tr
                                    key={event._id}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: i * 0.05 }}
                                    whileHover={{ backgroundColor: "var(--color-base-300)" }}
                                >
                                    <td className="px-4 py-2">{i + 1}</td>
                                    <td className="px-4 py-2 font-semibold text-secondary">{event.name}</td>
                                    <td className="px-4 py-2">{event.type}</td>
                                    <td className="px-4 py-2">{new Date(event.date).toLocaleDateString()}</td>
                                    <td className="px-4 py-2">{event.venue}</td>
                                    <td className="px-4 py-2">{event.athleticCategory}</td>
                                    <td className="px-4 py-2">{event.contactNumber}</td>
                                    <td className="px-4 py-2">{event.difficulty}</td>
                                    <td className="px-4 py-2 flex gap-2">
                                        <button onClick={() => handleUpdate(event._id)} className="p-2 bg-primary text-white rounded-lg hover:bg-primary/85 transition">
                                            <FiEdit />
                                        </button>
                                        <button onClick={() => handleDelete(event._id)} className="p-2 bg-error text-white rounded-lg hover:bg-error/85 transition">
                                            <FiTrash2 />
                                        </button>
                                    </td>
                                </motion.tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            ) : (
                // Card View
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {events.map((event, i) => (
                        <motion.div
                            key={event._id}
                            className="bg-base-100 rounded-2xl shadow-md border border-base-300 p-5 hover:shadow-xl transition flex flex-col justify-between"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.05 }}
                        >
                            <div>
                                <h3 className="text-xl font-bold text-secondary">{event.name}</h3>
                                <p className="text-sm text-gray-500 mt-1">{event.type} • {new Date(event.date).toLocaleDateString()}</p>
                                <p className="mt-2 text-gray-700">{event.description.slice(0, 80)}...</p>
                            </div>
                            <div className="mt-4 text-sm space-y-1">
                                <p><span className="font-semibold">Venue:</span> {event.venue}</p>
                                <p><span className="font-semibold">Category:</span> {event.athleticCategory}</p>
                                <p><span className="font-semibold">Contact:</span> {event.contactNumber}</p>
                                <p><span className="font-semibold">Difficulty:</span> {event.difficulty}</p>
                            </div>
                            <div className="flex gap-2 mt-4">
                                <button onClick={() => handleUpdate(event._id)} className="flex-1 flex items-center justify-center gap-1 px-3 py-2 bg-primary text-white rounded-xl hover:bg-primary/85 transition">
                                    <FiEdit /> Edit
                                </button>
                                <button onClick={() => handleDelete(event._id)} className="flex-1 flex items-center justify-center gap-1 px-3 py-2 bg-error text-white rounded-xl hover:bg-error/85 transition">
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
