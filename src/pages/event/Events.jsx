import { Suspense } from "react";
import EventsList from "./EventList";
import axios from "axios";
import Loading from "../shared/Loading";

export default function Events() {
    // create the promise immediately
    const myEventPromise = axios("http://localhost:3000/events").then(res => res.data);

    return (
        <Suspense fallback={<Loading></Loading>}>
            <EventsList myEventPromise={myEventPromise} />
        </Suspense>
    );
}
