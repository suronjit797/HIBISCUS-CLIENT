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
import { useAuthState } from 'react-firebase-hooks/auth';
import auth from './firebase.init';
import { Spinner } from 'react-bootstrap';
import SingleInventory from './Pages/SingleInventory/SingleInventory';


function App() {


  // fire base
  const [user, loading, error] = useAuthState(auth);

  // loading spinner
  if (loading) {
    return (
      <section className="centerSpinner">
        <Spinner animation="border" variant="primary" />
      </section>
    )
  }


  return (
    <div className="app">
      <ToastContainer toastClassName='text-capitalize' />
      <Header />

      <Routes>
        <Route path='/' element={<RequireAuth><Home /></RequireAuth>} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/inventory/:id' element={<SingleInventory />} />

        <Route path='*' element={<NotFound />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
