import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router";
import { motion } from "framer-motion";

export default function FeaturedEvents() {
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axios
            .get("https://athletic-server.vercel.app/events", { withCredentials: true })
            .then((res) => {
                setEvents(res.data);
            })
            .catch((err) => {
                console.error("Failed to fetch events", err);
            })
            .finally(() => {
                setLoading(false);
            });
    }, []);

    if (loading) {
        return (
            <div className="text-center py-8 text-lg font-medium animate-pulse">
                Loading Featured Events...
            </div>
        );
    }

    const sortedEvents = [...events].sort(
        (a, b) => new Date(a.date) - new Date(b.date)
    );
    const featuredEvents = sortedEvents.slice(0, 6);

    return (
        <section className="bg-base-200 py-16 px-6">
            {/* Title */}
            <motion.h2
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="text-4xl text-center font-extrabold mb-10 text-primary relative"
            >
                Featured Events
                <span className="block w-16 h-1 bg-secondary mx-auto mt-2 rounded-full"></span>
            </motion.h2>

            {/* Cards Grid */}
            <motion.div
                initial="hidden"
                animate="visible"
                variants={{
                    hidden: {},
                    visible: {
                        transition: { staggerChildren: 0.1 }
                    }
                }}
                className="grid gap-10 grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
            >
                {featuredEvents.map((event) => (
                    <motion.div
                        key={event._id}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4 }}
                        className="bg-white rounded-2xl shadow-md hover:shadow-xl overflow-hidden flex flex-col transition"
                    >
                        {/* Image */}
                        <div className="relative">
                            <img
                                src={event.pictureUrl}
                                alt={event.name}
                                className="w-full h-52 object-cover"
                            />
                            <div className="absolute top-3 left-3 bg-secondary text-white text-xs font-medium px-3 py-1 rounded-full shadow">
                                {new Date(event.date).toLocaleDateString()}
                            </div>
                        </div>

                        {/* Content */}
                        <div className="p-6 flex flex-col flex-1">
                            <h3 className="text-xl font-bold text-primary">{event.name}</h3>
                            <p className="text-gray-600 text-sm mb-4">{event.venue}</p>

                            <Link
                                to={`/viewEventDetails/${event._id}`}
                                className="mt-auto inline-block px-4 py-2 bg-primary text-white rounded-lg hover:bg-opacity-90 text-center transition"
                            >
                                View Details
                            </Link>
                        </div>
                    </motion.div>
                ))}
            </motion.div>

            {/* See All Button */}
            <div className="flex justify-center items-center mt-12">
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <Link
                        to="/events"
                        className="px-6 py-3 bg-primary text-white hover:brightness-110 font-semibold rounded-lg shadow-md transition"
                    >
                        See All Events
                    </Link>
                </motion.div>
            </div>
        </section>
    );
}
