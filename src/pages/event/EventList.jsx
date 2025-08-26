import { use } from "react";
import { Link } from "react-router";
import { motion } from "framer-motion";

export default function EventsList({ myEventPromise }) {
    const events = use(myEventPromise);

    return (
        <div className="max-w-7xl mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                {events.map((event, index) => (
                    <motion.div
                        key={event._id}
                        className="bg-gradient-to-br from-base-100 to-base-200 shadow-lg rounded-3xl p-6 flex flex-col items-center hover:shadow-2xl transition"
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1, type: "spring", stiffness: 50 }}
                        whileHover={{ scale: 1.05 }}
                    >
                        <motion.img
                            src={event.pictureUrl}
                            alt={event.creatorName}
                            className="w-28 h-28 rounded-full border-4 mb-4 shadow-md"
                            style={{ borderColor: "#f97316" }}
                            whileHover={{ rotate: 5 }}
                        />

                        <h2 className="text-2xl font-bold text-primary mb-1 text-center">
                            {event.name}
                        </h2>
                        <p className="text-base-content/70 text-sm mb-3 text-center">
                            Created by: {event.creatorName} ({event.creatorEmail})
                        </p>

                        <div className="mb-4 space-y-1">
                            <p className="text-base-content/70">
                                <span className="font-semibold text-secondary">Type: </span>
                                {event.type}
                            </p>
                            <p className="text-base-content/70">
                                <span className="font-semibold text-secondary">Date: </span>
                                {new Date(event.date).toLocaleDateString()}
                            </p>
                            <p className="text-base-content/70">
                                <span className="font-semibold text-secondary">Description: </span>
                                {event.description.split(" ").slice(0, 25).join(" ")}...
                            </p>
                        </div>

                        <Link
                            to={`/viewEventDetails/${event._id}`}
                            className="w-full mt-auto py-2 bg-gradient-to-r from-primary to-secondary text-white font-semibold rounded-xl shadow-lg hover:brightness-110 transition text-center"
                        >
                            View Details
                        </Link>
                    </motion.div>
                ))}
            </div>
        </div>
    );
}
