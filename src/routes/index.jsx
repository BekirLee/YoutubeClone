import { createBrowserRouter } from "react-router-dom";
import Home from "../pages/home";
import Videos from "../pages/Videos";


const routes = createBrowserRouter([
    {
        path: "/",
        element: <Home />
    },
    {
        path: '/videos',
        element: <Videos />
    },
    {
        path: "/*",
        element: <div>404</div>
    }
])

export default routes;