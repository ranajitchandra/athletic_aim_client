import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function UpComingEventsCountDown() {
    const [event, setEvent] = useState(null);
    const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetch("https://athletic-server.vercel.app/events/upcoming")
            .then((res) => {
                if (!res.ok) throw new Error("No upcoming event found");
                return res.json();
            })
            .then((data) => {
                setEvent(data);
                setLoading(false);
            })
            .catch((err) => {
                setError(err.message);
                setLoading(false);
            });
    }, []);

    useEffect(() => {
        if (!event?.date) return;

        const countdown = setInterval(() => {
            const now = new Date().getTime();
            const eventTime = new Date(event.date).getTime();
            const distance = eventTime - now;

            if (distance <= 0) {
                clearInterval(countdown);
                setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
                return;
            }

            setTimeLeft({
                days: Math.floor(distance / (1000 * 60 * 60 * 24)),
                hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
                minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
                seconds: Math.floor((distance % (1000 * 60)) / 1000),
            });
        }, 1000);

        return () => clearInterval(countdown);
    }, [event]);

    if (loading) return <Loader />;
    if (error) return <ErrorMessage message={error} />;
    if (!event) return <p className="text-center text-lg mt-10">No upcoming events found.</p>;

    return (
        <div className="bg-base-200">
            <motion.div
                className="max-w-xl mx-auto p-8 rounded-3xl shadow-2xl bg-gradient-to-r from-primary/80 to-secondary/80 text-white text-center select-none backdrop-blur-sm border border-white/20"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                whileHover={{ scale: 1.02 }}
            >
                <h2 className="text-4xl font-extrabold mb-3 drop-shadow-lg">Upcoming Event</h2>
                <p className="text-2xl font-semibold mb-1 drop-shadow">{event.name}</p>
                <p className="text-md mb-4 italic opacity-90 drop-shadow">{event.venue}</p>
                <p className="mb-6 text-sm tracking-wide opacity-80 drop-shadow">
                    {new Date(event.date).toLocaleString(undefined, {
                        weekday: "short",
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                    })}
                </p>

                <div className="flex justify-center gap-4 flex-wrap">
                    <TimeBox label="Days" value={timeLeft.days} />
                    <TimeBox label="Hours" value={timeLeft.hours} />
                    <TimeBox label="Minutes" value={timeLeft.minutes} />
                    <TimeBox label="Seconds" value={timeLeft.seconds} />
                </div>
            </motion.div>
        </div>
    );
}

function TimeBox({ label, value }) {
    return (
        <motion.div
            className="bg-white/20 backdrop-blur-md rounded-xl w-20 h-24 flex flex-col justify-center items-center shadow-lg"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 300 }}
        >
            <div className="text-4xl font-bold text-white">{value}</div>
            <div className="text-sm uppercase tracking-wide text-white/90 mt-1">{label}</div>
        </motion.div>
    );
}

function Loader() {
    return (
        <div className="flex justify-center items-center mt-10 gap-4">
            <span className="loading loading-spinner loading-lg text-primary"></span>
            <p className="text-primary font-semibold">Loading upcoming event...</p>
        </div>
    );
}

function ErrorMessage({ message }) {
    return (
        <div className="max-w-md mx-auto mt-10 p-4 bg-error/90 rounded-xl text-white text-center font-semibold shadow-lg">
            <p>Error: {message}</p>
        </div>
    );
}
