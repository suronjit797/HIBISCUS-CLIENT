import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom'
import axios from 'axios'


axios.defaults.baseURL = process.env.REACT_APP_PROXY

const auth_token = localStorage.getItem('auth_token')
if (auth_token) {
  axios.defaults.headers['Authorization'] = auth_token
} else {
  axios.defaults.headers['Authorization'] = ''
}



const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);


reportWebVitals();
