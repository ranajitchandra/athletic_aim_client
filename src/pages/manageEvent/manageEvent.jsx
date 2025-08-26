import { Suspense, useContext } from "react";
import ManageEventList from "./ManageEventList";
import { AuthContext } from "../../context/AuthContextProvider";
import Loading from "../shared/Loading";

export default function ManageEvent() {
    const { user } = useContext(AuthContext);

    const myEventPromise = fetch(
        `https://athletic-server.vercel.app/events?email=${user?.email}`,
        { credentials: "include" }
    ).then(res => res.json());

    return (
        <Suspense fallback={<Loading></Loading>}>
            <ManageEventList myEventPromise={myEventPromise} />
        </Suspense>
    );
}
