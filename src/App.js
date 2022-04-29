import { Route, Routes } from 'react-router-dom'
import { ToastContainer } from 'react-toastify';
import { useAuthState } from 'react-firebase-hooks/auth';
import auth from './firebase.init';
import { Spinner } from 'react-bootstrap';

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
import SingleInventory from './Pages/SingleInventory/SingleInventory';
import Inventories from './Pages/Inventories/Inventories';
import ManageInventories from './Pages/ManageInventories/ManageInventories';
import AddItems from './Pages/AddItems/AddItems';
import MyItems from './Pages/MyItems/MyItems';
import Blogs from './Pages/Blogs/Blogs';
import UpdateItem from './Pages/UpdateItem/UpdateItem';


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
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/inventory' element={<Inventories />} />
        <Route path='/inventory/:id' element={<RequireAuth><SingleInventory /></RequireAuth>} />
        <Route path='/update-item/:id' element={<RequireAuth><UpdateItem /></RequireAuth>} />
        <Route path='/manage-inventories' element={<RequireAuth><ManageInventories /></RequireAuth>} />
        <Route path='/add-items' element={<RequireAuth><AddItems /></RequireAuth>} />
        <Route path='/my-items' element={<RequireAuth><MyItems /></RequireAuth>} />
        <Route path='/blogs' element={<Blogs />} />

        <Route path='*' element={<NotFound />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
