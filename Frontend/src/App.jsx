import React, {Suspense} from 'react';
import {CircularProgress} from '@mui/material';
import {BrowserRouter as Router} from 'react-router-dom';
import AppRoutes from './routes';
import './App.css';
import { Loading } from './components/common';

/**
 * App root component with link navigations and routes
 * @constructor
 */
const App = () => (
  <Router>
    <Suspense fallback={
      <div
        style={{
          position: 'absolute', left: '50%', top: '50%',
          transform: 'translate(-50%, -50%)'
        }}
      >
        <Loading/>
      </div>}>
      <AppRoutes/>
    </Suspense>
  </Router>
);

export default App;
