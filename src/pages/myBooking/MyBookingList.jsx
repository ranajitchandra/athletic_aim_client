import React, { use, useContext, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { AuthContext } from "../../context/AuthContextProvider";
import Loading from "../shared/Loading";
import { useNavigate } from "react-router";
import Swal from "sweetalert2";

export default function MyBookingList({ myBookedEventPromise }) {
    const { user } = useContext(AuthContext);
    const navigate = useNavigate()
    const bookedData = use(myBookedEventPromise);

    useEffect(() => {
        if (bookedData.length === 0) {
            Swal.fire({
                position: "center",
                icon: "info",
                title: "Your have no booked data",
                showConfirmButton: false,
                timer: 3000
            });
            navigate("/events"); // 👈 home page
        }
    }, [bookedData, navigate]);

    const [loading, setLoading] = useState(true);
    const [bookings, setBookings] = useState([]);
    const [viewMode, setViewMode] = useState("table"); // 'table' | 'card'

    console.log(bookings.length);

    useEffect(() => {
        if (user?.email && bookedData?.length) {
            setBookings(bookedData.filter(item => item.bookedUser === user.email));
            setLoading(false);
        }
    }, [user?.email, bookedData]);

    if (loading) {
        return <Loading />;
    }

    return (
        <div>
            <div className="grid grid-cols-3 items-center my-8">
                <div></div>
                <h2 className="text-center text-2xl font-bold">My Booked Events</h2>
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
                    <table className="min-w-full border-collapse border border-gray-300 my-4">
                        <thead>
                            <tr className="bg-[var(--color-secondary)] text-white">
                                <th className="border border-gray-300 p-2 text-left">#</th>
                                <th className="border border-gray-300 p-2 text-left">Picture</th>
                                <th className="border border-gray-300 p-2 text-left">Name</th>
                                <th className="border border-gray-300 p-2 text-left">Type</th>
                                <th className="border border-gray-300 p-2 text-left">Date</th>
                                <th className="border border-gray-300 p-2 text-left">Creator Email</th>
                                <th className="border border-gray-300 p-2 text-left">Price</th>
                            </tr>
                        </thead>
                        <tbody>
                            {bookings.map((event, i) => (
                                <motion.tr
                                    key={event._id}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: i * 0.05 }}
                                    whileHover={{ cursor: "pointer" }}
                                >
                                    <td className="border border-gray-300 p-2">{i + 1}</td>
                                    <td className="border border-gray-300 p-2">
                                        <img
                                            src={event.pictureUrl}
                                            alt={event.name}
                                            className="w-16 h-12 object-cover rounded"
                                        />
                                    </td>
                                    <td className="border border-gray-300 p-2">{event.name}</td>
                                    <td className="border border-gray-300 p-2">{event.type}</td>
                                    <td className="border border-gray-300 p-2">{event.date}</td>
                                    <td className="border border-gray-300 p-2">{event.creatorEmail}</td>
                                    <td className="border border-gray-300 p-2">${event.price.toLocaleString()}</td>
                                </motion.tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
                    {bookings.map((event, i) => (
                        <motion.div
                            key={event._id}
                            className="bg-white rounded-xl shadow-md p-4 border hover:shadow-lg transition"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.05 }}
                        >
                            <img
                                src={event.pictureUrl}
                                alt={event.name}
                                className="w-full object-cover rounded mb-2"
                            />
                            <h3 className="text-lg font-bold text-[var(--color-secondary)]">
                                {event.name}
                            </h3>
                            <p className="text-sm text-gray-600">{event.type} • {event.date}</p>
                            <div className="mt-2 text-sm">
                                <p><span className="font-semibold">Creator:</span> {event.creatorEmail}</p>
                                <p><span className="font-semibold">Contact:</span> {event.contactNumber}</p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            )}
        </div>
    );
}
