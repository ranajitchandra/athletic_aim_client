import React, { useContext, useEffect } from "react";
import { Link, useLoaderData, useNavigate, useParams } from "react-router";
import { motion } from "framer-motion";
import AOS from "aos";
import "aos/dist/aos.css";
import { AuthContext } from "../../context/AuthContextProvider";
import axios from "axios";
import Swal from "sweetalert2";
import Lottie from "lottie-react";
import errorPageJSON from "../../assets/error.json";

export default function ViewEventDetails() {
    const { user } = useContext(AuthContext);
    const { id } = useParams();
    const event = useLoaderData();
    const navigate = useNavigate();

    if (id !== event._id) {
        return (
            <div className="h-screen flex flex-col items-center justify-center bg-base-200 px-4 text-center">
                <Lottie style={{ width: "300px" }} animationData={errorPageJSON} loop />
                <h2 className="text-2xl md:text-3xl font-semibold text-gray-800 mb-2">
                    Event Not Found
                </h2>
                <p className="text-gray-600 mb-6">
                    Please check the URL or go back to the events page.
                </p>
                <Link
                    to="/events"
                    className="px-6 py-2 bg-gradient-to-r from-primary to-secondary text-white rounded-lg shadow hover:brightness-110 transition"
                >
                    Go to Events
                </Link>
            </div>
        );
    }

    useEffect(() => {
        AOS.init({ duration: 1000, once: true });
    }, []);

    const handleEventBooked = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.get(`https://athletic-server.vercel.app/eventBooking/${event._id}`);
            if (res.data.bookedUser === user.email) {
                Swal.fire({
                    title: "You already booked this event",
                    icon: "info",
                    confirmButtonText: "OK",
                });
                return;
            }
            navigate(`/payment/${event._id}`);
        } catch (error) {
            Swal.fire({
                title: "Something went wrong",
                text: error.message || "Please try again later.",
                icon: "error",
            });
        }
    };

    return (
        <motion.div
            className="max-w-5xl mx-auto p-6 md:p-10 mt-10 mb-16 bg-gradient-to-br from-base-100 to-base-200 rounded-3xl shadow-2xl flex flex-col md:flex-row gap-8"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
        >
            {/* Left Image */}
            <div
                className="md:w-1/2 flex justify-center items-center rounded-2xl overflow-hidden"
                data-aos="fade-right"
            >
                <img
                    src={event.pictureUrl}
                    alt={event.creatorName}
                    className="w-full h-80 md:h-96 object-cover rounded-2xl"
                />
            </div>

            {/* Right Details */}
            <div className="md:w-1/2 space-y-4 text-center md:text-left" data-aos="fade-left">
                <h2 className="text-3xl md:text-4xl font-extrabold text-primary mb-2">
                    {event.name}
                </h2>
                <p className="text-base-content/70 text-sm md:text-base">
                    Created by: <span className="font-semibold text-secondary">{event.creatorName}</span> ({event.creatorEmail})
                </p>

                <div className="space-y-2 text-gray-700">
                    <p className="text-base-content/70">
                        <span className="font-semibold text-secondary">Type:</span> {event.type}
                    </p>
                    <p className="text-base-content/70">
                        <span className="font-semibold text-secondary">Date:</span> {new Date(event.date).toLocaleDateString()}
                    </p>
                    <p className="text-base-content/70">
                        <span className="font-semibold text-secondary">Venue:</span> {event.venue}
                    </p>
                    <p className="text-base-content/70">
                        <span className="font-semibold text-secondary">Category:</span> {event.athleticCategory}
                    </p>
                    <p className="text-base-content/70">
                        <span className="font-semibold text-secondary">Difficulty:</span>{" "}
                        <span className="inline-block px-3 py-1 text-xs font-semibold rounded-full bg-accent text-white">
                            {event.difficulty}
                        </span>
                    </p>
                    <p className="text-base-content/70">
                        <span className="font-semibold text-secondary">Contact:</span> {event.contactNumber}
                    </p>
                    <p className="text-base-content/70">
                        <span className="font-semibold text-secondary">Description:</span> {event.description}
                    </p>
                    <p className="text-base-content/70">
                        <span className="font-semibold text-secondary">Price:</span> ${event.price}
                    </p>
                </div>

                <motion.button
                    onClick={handleEventBooked}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-full py-3 mt-4 rounded-xl text-white font-bold bg-gradient-to-r from-primary to-secondary shadow-lg hover:brightness-110 transition"
                >
                    Book Event
                </motion.button>
            </div>
        </motion.div>
    );
}
