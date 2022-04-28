import { Route, Routes } from 'react-router-dom'
import { ToastContainer } from 'react-toastify';

// styles
import 'react-toastify/dist/ReactToastify.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css';


// components and pages
import Header from './Components/Header/Header';
import RequireAuth from './Components/RequireAuth/RequireAuth';
import Home from './Pages/Home/Home';
import Login from './Pages/Login/Login';
import NotFound from './Pages/NotFound/NotFound';
import Footer from './Components/Footer/Footer';
import Register from './Pages/Register/Register';


function App() {

  return (
    <div className="app">
      <ToastContainer />
      <Header />

      <div className="container">
        <Routes>
          <Route path='/' element={<RequireAuth><Home /></RequireAuth>} />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />

          <Route path='*' element={<NotFound />} />
        </Routes>
      </div>

      <Footer />
    </div>
  );
}

export default App;
