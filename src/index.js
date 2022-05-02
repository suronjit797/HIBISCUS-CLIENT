import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom'
import axios from 'axios'


const auth_token = localStorage.getItem('auth_token')

if (auth_token) {
  axios.defaults.headers.common['Authorization'] = auth_token
} else {
  axios.defaults.headers.common['Authorization'] = ''
}

axios.defaults.baseURL = process.env.REACT_APP_PROXY

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);


reportWebVitals();
