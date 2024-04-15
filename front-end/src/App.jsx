import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import RegisterCustomerStep1 from './pages/Customer/RegisterPage/RegisterCustomerStep1/RegisterCustomerStep1';
import RegisterCustomerStep2 from './pages/Customer/RegisterPage/RegisterCustomerStep2/RegisterCustomerStep2';
function App() {
  return (
    <Router>
        <Routes>
          <Route path="/" Component={RegisterCustomerStep1} />
          <Route path="/step2"  Component={RegisterCustomerStep2} />
        </Routes>
    </Router>
  );
}

export default App;
