import { Suspense } from "react";
import EventsList from "./EventList";
import axios from "axios";

export default function Events() {
    // create the promise immediately
    const myEventPromise = axios("http://localhost:3000/events").then(res => res.data);

    return (
        <Suspense fallback={"Loading Application"}>
            <EventsList myEventPromise={myEventPromise} />
        </Suspense>
    );
}
