import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router";
import { motion } from "framer-motion";

export default function FeaturedEvents() {
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axios
            .get("http://localhost:3000/events", { withCredentials: true })
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
        return <div className="text-center py-8 text-lg font-medium animate-pulse">Loading Featured Events...</div>;
    }

    const sortedEvents = [...events].sort(
        (a, b) => new Date(a.date) - new Date(b.date)
    );
    const featuredEvents = sortedEvents.slice(0, 6);

    return (
        <section className="bg-white py-15">
            <motion.h2
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="text-3xl text-center font-extrabold my-4 text-primary"
            >
                Featured Events
            </motion.h2>

            <motion.div
                initial="hidden"
                animate="visible"
                variants={{
                    hidden: {},
                    visible: {
                        transition: {
                            staggerChildren: 0.1
                        }
                    }
                }}
                className="grid gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 my-10"
            >
                {featuredEvents.map((event) => (
                    <motion.div
                        key={event._id}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4 }}
                        className="bg-white border border-primary rounded-2xl shadow-lg overflow-hidden flex flex-col"
                    >
                        <div className="relative">
                            <img
                                src={event.pictureUrl}
                                alt={event.name}
                                className="w-full h-48 object-cover"
                            />
                            <div className="absolute bottom-2 right-2 bg-accent px-2 py-1 rounded text-sm text-black shadow">
                                {new Date(event.date).toLocaleDateString()}
                            </div>
                        </div>
                        <div className="p-4 flex flex-col flex-1">
                            <h3 className="text-lg font-bold text-secondary">{event.name}</h3>
                            <p className="text-gray-600 text-sm mb-4">{event.venue}</p>
                            <Link
                                to={`/viewEventDetails/${event._id}`}
                                className="mt-auto inline-block px-3 py-2 bg-primary text-white rounded-lg hover:brightness-110 text-center transition"
                            >
                                View Details
                            </Link>
                        </div>
                    </motion.div>
                ))}
            </motion.div>

            <div className="flex justify-center items-center py-4">
                <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                >
                    <Link
                        to="/events"
                        className="px-6 py-3 bg-secondary text-white hover:brightness-110 font-medium rounded-lg  transition"
                    >
                        See All Events
                    </Link>
                </motion.div>
            </div>
        </section>
    );
}
