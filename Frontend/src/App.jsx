import React, {Suspense} from 'react';
import {BrowserRouter as Router} from 'react-router-dom';
import AppRoutes from './routes';
import './App.css';

/**
 * App root component with link navigations and routes
 * @constructor
 */
const App = () => (
  <Router>
    <Suspense fallback={<div>Loading...</div>}>
      <AppRoutes/>
    </Suspense>
  </Router>
);

export default App;
