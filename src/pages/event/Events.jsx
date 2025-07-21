import { Suspense, useState } from "react";
import EventsList from "./EventList";
import axios from "axios";
import Loading from "../shared/Loading";

export default function Events() {
    // create the promise immediately
    // const myEventPromise = axios("https://athletic-server.vercel.app/events", {
    //     withCredentials: true
    // }).then(res => res.data);



    const [search, setSearch] = useState("");
    const [myEventPromise, setMyEventPromise] = useState(
        axios("https://athletic-server.vercel.app/events", {
            withCredentials: true
        }).then(res => res.data)

    );

    const handleSearch = () => {
        const params = {};
        if (search.trim()) {
            params.name = search.trim();
        }
        console.log(params);


        setMyEventPromise(
            axios("https://athletic-server.vercel.app/events", {
                params,
                withCredentials: true
            }).then(res => res.data)
        );
    };

    return (
        <>
            <div className=" flex justify-center p-6">
                <div className="mb-4 flex gap-2">
                    <input
                        type="text"
                        placeholder="Search by name"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="border p-2 rounded-lg w-64"
                    />
                    <button
                        onClick={handleSearch}
                        className="px-4 py-2 bg-red-600 text-white rounded-lg"
                    >
                        Search
                    </button>
                </div>
            </div>
            <Suspense fallback={<Loading></Loading>}>
                <EventsList myEventPromise={myEventPromise} />
            </Suspense>
        </>
    );
}
