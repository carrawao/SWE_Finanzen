import React, { Suspense } from 'react';
import { BrowserRouter as Router, Link } from 'react-router-dom';
import AppRoutes from './routes/index';
import './App.css';

/**
 * App root component with link navigations and routes
 * @constructor
 */
const App = () => (
    <Router>
        <div>
            <nav>
                <ul>
                    <li>
                        <Link to="/">Home</Link>
                    </li>
                    <li>
                        <Link to="/about">About</Link>
                    </li>
                </ul>
            </nav>
            <Suspense fallback={<div>Loading...</div>}>
                <AppRoutes />
            </Suspense>
        </div>
    </Router>
  );

export default App;
