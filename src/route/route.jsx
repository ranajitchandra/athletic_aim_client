
import { createBrowserRouter, Navigate } from "react-router";
import RootLayout from "../rootLayouts/RootLayout";
import Home from "../pages/home/Home";
import Register from "../pages/Register";
import Login from "../pages/Login";
import AddEventForm from "../pages/event/AddEventForm";
import Events from "../pages/event/Events";
import ViewEventDetails from "../pages/event/ViewEventDetails";
import ManageEvent from "../pages/manageEvent/manageEvent";
import UpdateEvent from "../pages/manageEvent/UpdateEvent";
import ErrorPage from "../pages/shared/ErrorPage";
import MyBooking from "../pages/myBooking/MyBooking";
import PrivateRoute from "./PrivateRoute";
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
                    element: <PrivateRoute> <AddEventForm></AddEventForm> </PrivateRoute>
                },
                {
                    path: "/events",
                    element: <PrivateRoute> <Events></Events> </PrivateRoute>
                },
                {
                    path: "/viewEventDetails/:id",
                    element: <PrivateRoute> <ViewEventDetails></ViewEventDetails> </PrivateRoute>,
                    loader: ({ params }) => fetch(`http://localhost:3000/events/${params.id}`)
                },
                {
                    path: "/manageEvent",
                    element: <PrivateRoute> <ManageEvent></ManageEvent> </PrivateRoute>
                },
                {
                    path: "/updateEvent/:id",
                    element: <PrivateRoute> <UpdateEvent></UpdateEvent> </PrivateRoute>,
                    loader: ({ params }) => fetch(`http://localhost:3000/events/${params.id}`),
                    hydrateFallbackElement: <ErrorPage></ErrorPage>
                },
                {
                    path: "/myBooking",
                    element: <PrivateRoute> <MyBooking></MyBooking> </PrivateRoute>
                },
                {
                    path: "/login",
                    element: <Login></Login>
                },
                {
                    path: "/register",
                    element: <Register></Register>
                },
                {
                    path: "*",
                    element: <ErrorPage></ErrorPage>
                },
            ]
        },
    ]
)


