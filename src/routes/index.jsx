import { createBrowserRouter } from "react-router-dom";
import Home from "../pages/home";
const routes = createBrowserRouter([
    {
        path: "/",
        element: <Home />
    },
    {
        path: "/*",
        element: <div>404</div>
    }
])

export default routes;