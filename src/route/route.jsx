
import { createBrowserRouter, Navigate } from "react-router";
import RootLayout from "../rootLayouts/RootLayout";
import Home from "../pages/home/Home";
import Register from "../pages/Register";
import Login from "../pages/Login";
import AddEventForm from "../pages/event/AddEventForm";
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


