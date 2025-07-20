import { use } from "react";
import { Link } from "react-router";
import { motion } from "framer-motion";

export default function EventsList({ myEventPromise }) {
    const events = use(myEventPromise);

    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 m-8">
            {events.map((event, index) => (
                <motion.div
                    key={event._id}
                    className="bg-white rounded-2xl p-4 flex flex-col items-center"
                    style={{ cursor: "pointer" }}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1, type: "spring", stiffness: 50 }}
                    whileHover={{ scale: 1.05, boxShadow: "0px 8px 24px rgba(0,0,0,0.2)" }}
                >
                    <motion.img
                        src={event.pictureUrl}
                        alt={event.creatorName}
                        className="w-24 h-24 rounded-full border-4 mb-2"
                        style={{ borderColor: "#E63825" }}
                        whileHover={{ rotate: 5 }}
                    />
                    <h2
                        className="text-xl font-bold"
                        style={{ color: "#262261" }}
                    >
                        {event.name}
                    </h2>
                    <p className="text-sm text-gray-500">
                        Created by: {event.creatorName} ({event.creatorEmail})
                    </p>

                    <div className="my-4 space-y-1 w-full">
                        <p>
                            <span className="font-semibold" style={{ color: "#262261" }}>
                                Type:{' '}
                            </span>
                            {event.type}
                        </p>
                        <p>
                            <span className="font-semibold" style={{ color: "#262261" }}>
                                Date:{' '}
                            </span>
                            {event.date}
                        </p>
                        <p>
                            <span className="font-semibold" style={{ color: "#262261" }}>
                                Description:{' '}
                            </span>
                            {event.description.split(" ").slice(0, 30).join(" ")}
                        </p>
                    </div>

                    <Link
                        to={`/viewEventDetails/${event._id}`}
                        className="w-full mt-auto py-2 text-center rounded-lg text-white font-semibold"
                        style={{ backgroundColor: "#E63825" }}
                    >
                        View Details
                    </Link>
                </motion.div>
            ))}
        </div>
    );
}
