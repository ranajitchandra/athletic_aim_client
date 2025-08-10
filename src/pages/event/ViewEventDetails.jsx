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
    const { user } = useContext(AuthContext)
    const { id } = useParams()
    const event = useLoaderData();
    const navigate = useNavigate();

    if (id !== event._id) {
        return (
            <div className="h-screen flex flex-col items-center justify-center bg-white px-4 text-center">
                <Lottie style={{ width: "300px" }} animationData={errorPageJSON} loop />
                <h2 className="text-2xl md:text-3xl font-semibold text-gray-800 mb-2">
                    Your event could not be found
                </h2>
                <p className="text-gray-600 mb-6">
                    Please check the URL or go back to the homepage.
                </p>
                <Link
                    to="/events"
                    className="px-6 py-2 bg-blue-700 text-white rounded-lg hover:bg-secondary transition"
                >
                    Go to Events
                </Link>
            </div>
        );
    }

    useEffect(() => {
        AOS.init({ duration: 1000, once: true });
    }, []);

    // http://localhost:3000/eventBooking/${event._id}


    const handleEventBooked = async (e) => {
        e.preventDefault();

        try {
            // Check if user already booked
            const res = await axios.get(`http://localhost:3000/eventBooking/${event._id}`);
            if (res.data.bookedUser === user.email) {
                Swal.fire({
                    title: "You already booked this event",
                    icon: "info",
                    confirmButtonText: "OK",
                });
                return; // 🚫 stop here if already booked
            }

            navigate(`/payment/${event._id}`);

            // If not booked, proceed to book
            // const eventBooked = {
            //     eventID: event._id,
            //     bookedUser: user.email,
            // };

            // const postRes = await axios.post(
            //     "http://localhost:3000/eventBooking",
            //     eventBooked
            // );

            // if (postRes.data.insertedId) {
            //     Swal.fire({
            //         title: "Event Booked Successful",
            //         icon: "success",
            //         draggable: true,
            //     });
            // }
        } catch (error) {
            console.error(error);
            Swal.fire({
                title: "Something went wrong",
                text: error.message || "Please try again later.",
                icon: "error",
            });
        }
    };


    // const handleEventBooked = (e) => {
    //     e.preventDefault();

    //     axios.get(`http://localhost:3000/eventBooking/${event._id}`)
    //         .then(function (response) {
    //             // console.log(response.data.bookedUser, user.email);
    //             if (response.data.bookedUser === user.email) {
    //                 Swal.fire({
    //                     title: "You already booked this event",
    //                     icon: "info",
    //                     confirmButtonText: "OK"
    //                 });

    //                 return

    //             }
    //         })
    //         .catch(function (error) {
    //             console.log(error);
    //         });

    //     const eventBooked = {
    //         eventID: event._id,
    //         bookedUser: user.email
    //     }
    //     axios.post('http://localhost:3000/eventBooking', eventBooked)
    //         .then(function (response) {
    //             console.log(response.data);
    //             if (response.data.insertedId) {
    //                 Swal.fire({
    //                     title: "Event Booked Successful",
    //                     icon: "success",
    //                     draggable: true
    //                 });

    //             }
    //         })
    //         .catch(function (error) {
    //             console.log(error);
    //         });

    // };


    return (
        <motion.div
            className="max-w-4xl mx-auto bg-white shadow-2xl rounded-3xl p-8 md:flex gap-2 mt-5 mb-10"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
        >
            {/* Left side image */}
            <div
                className="md:w-1/2 flex justify-center items-center"
                data-aos="fade-right"
            >
                <img
                    src={event.pictureUrl}
                    alt={event.creatorName}
                    className="w-64 h-64 rounded-2xl shadow-lg object-cover"
                />
            </div>

            {/* Right side details */}
            <div className="md:w-1/2 space-y-4" data-aos="fade-left">
                <h2 className="text-3xl font-bold text-secondary">{event.name}</h2>
                <p className="text-sm text-gray-500">
                    Created by: {event.creatorName} ({event.creatorEmail})
                </p>

                <div className="space-y-2">
                    <p>
                        <span className="font-semibold text-secondary">Type: </span>
                        {event.type}
                    </p>
                    <p>
                        <span className="font-semibold text-secondary">Date: </span>
                        {event.date}
                    </p>
                    <p>
                        <span className="font-semibold text-secondary">Venue: </span>
                        {event.venue}
                    </p>
                    <p>
                        <span className="font-semibold text-secondary">Athletic Category: </span>
                        {event.athleticCategory}
                    </p>
                    <p>
                        <span className="font-semibold text-secondary">Difficulty: </span>
                        <span className="inline-block px-2 py-1 text-xs font-semibold rounded bg-accent text-secondary">
                            {event.difficulty}
                        </span>
                    </p>
                    <p>
                        <span className="font-semibold text-secondary">Contact Number: </span>
                        {event.contactNumber}
                    </p>
                    <p>
                        <span className="font-semibold text-secondary">Description: </span>
                        {event.description}
                    </p>
                    <p>
                        <span className="font-semibold text-secondary">Price: </span>
                        {event.price}$
                    </p>
                </div>

                <motion.button onClick={handleEventBooked}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="btn btn-primary w-full mt-4"
                >
                    Book Event
                </motion.button>
            </div>
        </motion.div>
    );
}
