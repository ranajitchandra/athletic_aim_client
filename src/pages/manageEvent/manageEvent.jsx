import { Suspense, useContext } from "react";
import ManageEventList from "./ManageEventList";
import { AuthContext } from "../../context/AuthContextProvider";

export default function ManageEvent() {
    const { user } = useContext(AuthContext);

    const myEventPromise = fetch(
        `http://localhost:3000/events?email=${user?.email}`,
        { credentials: "include" }
    ).then(res => res.json());

    return (
        <Suspense fallback={"Loading Application"}>
            <ManageEventList myEventPromise={myEventPromise} />
        </Suspense>
    );
}
