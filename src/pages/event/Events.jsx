import { Suspense, useState } from "react";
import EventsList from "./EventList";
import axios from "axios";
import Loading from "../shared/Loading";

export default function Events() {
    const [search, setSearch] = useState("");
    const [myEventPromise, setMyEventPromise] = useState(
        axios("https://athletic-server.vercel.app/events", {
            withCredentials: true,
        }).then((res) => res.data)
    );

    const handleSearch = () => {
        const params = {};
        if (search.trim()) {
            params.name = search.trim();
        }

        setMyEventPromise(
            axios("https://athletic-server.vercel.app/events", {
                params,
                withCredentials: true,
            }).then((res) => res.data)
        );
    };

    return (
        <div className="bg-base-200 min-h-screen py-10 px-4">
            <div className="max-w-4xl mx-auto mb-8">
                <h1 className="text-3xl font-extrabold text-primary mb-6 text-center">
                    Browse Events
                </h1>

                <div className="flex flex-col sm:flex-row gap-3 justify-center items-center">
                    <input
                        type="text"
                        placeholder="Search by event name..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="input input-bordered w-full sm:w-64 rounded-lg border-gray-300 focus:ring-2 focus:ring-primary transition"
                    />
                    <button
                        onClick={handleSearch}
                        className="px-6 py-2 bg-primary text-white font-medium rounded-lg shadow hover:bg-primary/90 transition"
                    >
                        Search
                    </button>
                </div>
            </div>

            <Suspense fallback={<Loading />}>
                <EventsList myEventPromise={myEventPromise} />
            </Suspense>
        </div>
    );
}
