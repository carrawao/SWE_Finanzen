import React, {lazy} from "react";
import { Route, Routes } from 'react-router-dom';

/**
 * Optional the component could load lazily, allowing to borrow more
 * time for it to completely load
 */
const Home = lazy(() => import("../components/Home"));
const About = lazy(() => import("../components/About"));

/**
 * Defines the routes for the different pages
 * @constructor
 */
let AppRoutes = () => (
    <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
    </Routes>
);

export default AppRoutes;