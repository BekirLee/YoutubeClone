import { createBrowserRouter } from "react-router-dom";
import Home from "../pages/home";
import Videos from "../pages/Videos";
import Channel from "../pages/channel";
import SearchQueryPage from "../pages/searchQuery";


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
        path: '/channel',
        element: <Channel />
    },
    {
        path: '/search',
        element: <SearchQueryPage />
    },
    {
        path: "/*",
        element: <div>404</div>
    }
])

export default routes;