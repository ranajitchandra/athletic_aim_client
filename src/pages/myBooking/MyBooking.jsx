import { Suspense, useContext } from "react";
import { AuthContext } from "../../context/AuthContextProvider";
import MyBookingList from "./MyBookingList";
import Loading from "../shared/Loading";

export default function MyBooking() {
    const { user } = useContext(AuthContext);

    const myBookedEventPromise = fetch(
        `http://localhost:3000/bookedEvent?email=${user?.email}`,
        { credentials: "include" }
    ).then(res => res.json());

    return (
        <Suspense fallback={<Loading></Loading>}>
            <MyBookingList myBookedEventPromise={myBookedEventPromise}></MyBookingList>
        </Suspense>
    );
}
