import { createBrowserRouter } from "react-router-dom";
import Homepages from "../pages/Homepages";
import Login from "../pages/Login";
import Register from "../pages/Register";


export const router = createBrowserRouter([
    {
        path:"/",
        element: <Homepages/>

    }
    ,
    {
        path: "/login",
        element: <Login />
    },
    {
        path: "/register",
        element: <Register />
    }
])

