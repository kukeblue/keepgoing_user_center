import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import PicPage from './page/pic/index'
import DetailPage from './page/detail/index'
import PayPage from './page/pay/index'
// import ResultPage from './page/result/index'
// import AboutPage from './page/about/index'
// import CoursePage from './page/course/index'
// import CourseDetail from './page/courseDetail/index'
import Login from './page/login/index'
import Register from './page/register/index'





import {
    createBrowserRouter,
    RouterProvider,
    Route,
    Link,
    Navigate
} from "react-router-dom";
import DefaultLayout from './Layout/DefaultLayout';
import NoLoginLayout from './Layout/NoLoginLayout';


 


const router = createBrowserRouter([
    {
        element: <NoLoginLayout />,
        children: [
            {
                path: "/login",
                element: (
                    <Login />
                ),
                
            },
            {
                path: "/register",
                element: (
                    <Register />
                ),
                
            },
        ]
    },
    {
        element: <DefaultLayout />,
        children: [
            {
                path: "/index",
                element: (
                    <PicPage />
                ),
            },
            {
                path: "/goods/detail",
                element: (
                    <DetailPage />
                ),
            },
            // {
            //     path: "/course",
            //     element: (
            //         <CoursePage />
            //     ),
            // },
            // {
            //     path: "/about",
            //     element: (
            //         <AboutPage />
            //     ),
            // },
            // {
            //     path: "/course/course-detail",
            //     element: (
            //         <CourseDetail />
            //     ),
            // },
            {
                path: "/goods/pay",
                element: (
                    <PayPage />
                ),
            },
            //{
            //     path: "/goods/result",
            //     element: (
            //         <ResultPage />
            //     ),
                
            // }
        ],
    },
]);


ReactDOM.createRoot(document.getElementById('root')).render(
    // <React.StrictMode>
    <div><RouterProvider router={router} /></div>
    // </React.StrictMode>,
)
