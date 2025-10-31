

import { createBrowserRouter } from "react-router";
import RootLayout  from "../layouts/RootLayout.jsx";
import Home from "../pages/Home/Home/Home.jsx";
import History from "../pages/History/History.jsx";
import Login from "../pages/Authentication/Login/Login.jsx";
import Authleyout from "../layouts/Authleyout.jsx";



export const router = createBrowserRouter([
  {
    path: "/",
    Component: RootLayout,
    children: [
    
    {
        index: true,Component:Home
    },
    { 
        path: "history", Component: History
    },
]},

    {
    path: "/",
    Component: Authleyout ,
    children: [
    

    {   path: "login", 
        Component: Login 
    },

]
  },
]);