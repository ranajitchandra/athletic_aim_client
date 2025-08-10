
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
import Payment from "../pages/Payment/Payment";
import AdminRoute from "../pages/roleAccess/AdminRoute";
import UserRoute from "../pages/roleAccess/UserRoute";
import ViewAllUsers from "../pages/users/ViewAllUsers";
import Profile from "../pages/profile/profile";
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
                    path: "/events",
                    element: <PrivateRoute> <Events></Events> </PrivateRoute>
                },
                {
                    path: "/viewEventDetails/:id",
                    element: <PrivateRoute> <ViewEventDetails></ViewEventDetails> </PrivateRoute>,
                    loader: ({ params }) => fetch(`http://localhost:3000/events/${params.id}`)
                },
                {
                    path: "/addEvent",
                    element: <AdminRoute> <AddEventForm></AddEventForm> </AdminRoute>
                },
                {
                    path: "/payment/:eventId",
                    element: <PrivateRoute> <Payment></Payment> </PrivateRoute>
                },
                {
                    path: "/manageEvent",
                    element: <AdminRoute> <ManageEvent></ManageEvent> </AdminRoute>
                },
                {
                    path: "/updateEvent/:id",
                    element: <AdminRoute> <UpdateEvent></UpdateEvent> </AdminRoute>,
                    loader: ({ params }) => fetch(`http://localhost:3000/events/${params.id}`),
                    hydrateFallbackElement: <ErrorPage></ErrorPage>
                },
                {
                    path: "/myBooking",
                    element: <UserRoute><MyBooking></MyBooking></UserRoute>
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
                    path: "/users",
                    element: <AdminRoute> <ViewAllUsers></ViewAllUsers> </AdminRoute>
                },
                {
                    path: "/profile",
                    element: <PrivateRoute> <Profile></Profile> </PrivateRoute>
                },
                {
                    path: "*",
                    element: <ErrorPage></ErrorPage>
                },
            ]
        },
    ]
)


