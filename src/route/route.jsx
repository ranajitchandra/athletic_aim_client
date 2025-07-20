
import { createBrowserRouter, Navigate } from "react-router";
import RootLayout from "../rootLayouts/RootLayout";
import Home from "../pages/home/Home";
import Register from "../pages/Register";
import Login from "../pages/Login";
import AddEventForm from "../pages/event/AddEventForm";
import Events from "../pages/event/Events";
import ViewEventDetails from "../pages/event/ViewEventDetails";
import ManageEvent from "../pages/manageEvent/manageEvent";
export const router = createBrowserRouter(
    [
        {
            path: "/",
            element: <RootLayout></RootLayout>,
            children: [
                {
                    path: "/",
                    element: <Home></Home>
                },
                {
                    path: "/addEvent",
                    element: <AddEventForm></AddEventForm>
                },
                {
                    path: "/events",
                    element: <Events></Events>
                },
                {
                    path: "/viewEventDetails/:id",
                    element: <ViewEventDetails></ViewEventDetails>,
                    loader: ({ params }) => fetch(`http://localhost:3000/events/${params.id}`)
                },
                {
                    path: "/manageEvent",
                    element: <ManageEvent></ManageEvent>
                },
                {
                    path: "/login",
                    element: <Login></Login>
                },
                {
                    path: "/register",
                    element: <Register></Register>
                },
            ]
        },
    ]
)


