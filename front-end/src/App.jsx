import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import RegisterCustomerStep1 from './pages/Customer/RegisterPage/RegisterCustomerStep1/RegisterCustomerStep1';
import RegisterCustomerStep2 from './pages/Customer/RegisterPage/RegisterCustomerStep2/RegisterCustomerStep2';
import HomePage from './pages/Customer/HomePage/HomePage';
import LoginCustomer from './pages/Customer/LoginPage/LoginCustomer';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    
      <Router>
        <ToastContainer />
        <Routes>
          <Route path='/' Component={HomePage} />
          <Route path="/register/step1" Component={RegisterCustomerStep1} />
          <Route path="/register/step2"  Component={RegisterCustomerStep2} />
          <Route path='/login' Component={LoginCustomer} />
          <Route path='*' element={<h1>Not Found</h1>} />
        </Routes>
    </Router>

    
  );
}

export default App;
