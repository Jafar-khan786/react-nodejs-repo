import React from 'react';
import axios from "axios";
import {BrowserRouter as Router}  from "react-router-dom";
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

axios.defaults.baseURL = 'http://192.168.1.5:4500/api/';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
     <Router>
    <App />
    </Router>
  </React.StrictMode>
  
);

reportWebVitals();
