import React, { use } from "react";
import { motion } from "framer-motion";

export default function ManageEventList({ myEventPromise }) {
    const events = use(myEventPromise);

    return (
        <div className="overflow-x-auto">
            <table className="min-w-full border-collapse border border-gray-300">
                <thead>
                    <tr className="bg-[var(--color-accent)] text-white">
                        <th className="border border-gray-300 p-2 text-left">ID</th>
                        <th className="border border-gray-300 p-2 text-left">Name</th>
                        <th className="border border-gray-300 p-2 text-left">Type</th>
                        <th className="border border-gray-300 p-2 text-left">Date</th>
                        <th className="border border-gray-300 p-2 text-left">Venue</th>
                        <th className="border border-gray-300 p-2 text-left">Description</th>
                        <th className="border border-gray-300 p-2 text-left">Creator Email</th>
                        <th className="border border-gray-300 p-2 text-left">Athletic Category</th>
                        <th className="border border-gray-300 p-2 text-left">Contact Number</th>
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
                            transition={{ delay: i * 0.1, type: "spring", stiffness: 80 }}
                            whileHover={{
                                cursor: "pointer",
                            }}
                            style={{ color: "initial" }} // reset default text color
                        >
                            <td className="border border-gray-300 p-2">{i + 1}</td>
                            <td
                                className="border border-gray-300 p-2 font-semibold"
                                style={{ color: "var(--color-secondary)" }}
                            >
                                {event.name}
                            </td>
                            <td className="border border-gray-300 p-2">{event.type}</td>
                            <td className="border border-gray-300 p-2">{event.date}</td>
                            <td className="border border-gray-300 p-2">{event.venue}</td>
                            <td
                                className="border border-gray-300 p-2 max-w-xs truncate"
                                title={event.description}
                            >
                                {event.description}
                            </td>
                            <td className="border border-gray-300 p-2">{event.creatorEmail}</td>
                            <td className="border border-gray-300 p-2">{event.athleticCategory}</td>
                            <td className="border border-gray-300 p-2">{event.contactNumber}</td>
                            <td className="border border-gray-300 p-2">{event.difficulty}</td>
                            <td className="border border-gray-300 p-2">Action</td>
                        </motion.tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
