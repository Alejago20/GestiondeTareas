import { createBrowserRouter } from "react-router-dom";
import Homepages from "../pages/Homepages";


export const router = createBrowserRouter([
    {
        path:"/",
        element: <Homepages/>

    }
])

