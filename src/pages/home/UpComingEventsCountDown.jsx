import { useEffect, useState } from "react";

export default function UpComingEventsCountDown() {
    const [event, setEvent] = useState(null);
    const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Fetch nearest upcoming event
    useEffect(() => {
        fetch("http://localhost:3000/events/upcoming")
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

    // Countdown logic
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
        <div className="max-w-lg mx-auto bg-primary rounded-xl shadow-2xl p-8 text-white text-center select-none">
            <h2 className="text-4xl font-extrabold mb-4 drop-shadow-lg">⏳ Upcoming Event</h2>
            <p className="text-xl mb-2 font-semibold drop-shadow">{event.name}</p>
            <p className="text-md mb-6 italic opacity-80 drop-shadow">{event.venue}</p>
            <p className="mb-6 text-sm opacity-70 tracking-wide drop-shadow">
                {new Date(event.date).toLocaleString(undefined, {
                    weekday: "short",
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                })}
            </p>

            <div className="flex justify-center gap-6">
                <TimeBox label="Days" value={timeLeft.days} />
                <TimeBox label="Hours" value={timeLeft.hours} />
                <TimeBox label="Minutes" value={timeLeft.minutes} />
                <TimeBox label="Seconds" value={timeLeft.seconds} />
            </div>
        </div>
    );
}

function TimeBox({ label, value }) {
    return (
        <div className="bg-secondary bg-opacity-90 rounded-xl w-20 h-24 flex flex-col justify-center items-center shadow-lg">
            <div className="text-4xl font-bold text-accent">{value}</div>
            <div className="text-sm uppercase tracking-wide text-white/80 mt-1">{label}</div>
        </div>
    );
}

function Loader() {
    return (
        <div className="flex justify-center items-center mt-10">
            <span className="loading loading-spinner loading-lg text-primary"></span>
            <p className="ml-4 text-primary font-semibold">Loading upcoming event...</p>
        </div>
    );
}

function ErrorMessage({ message }) {
    return (
        <div className="max-w-md mx-auto mt-10 p-4 bg-error rounded-lg text-white text-center font-semibold shadow-lg">
            <p>Error: {message}</p>
        </div>
    );
}
