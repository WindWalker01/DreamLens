import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomeCredit from './HomeCredit.jsx';
import Products from './Products/Products.jsx';
import LoansServices from './Loans/LoansServices.jsx';
import Promos from './Promos/Promos.jsx';
import About from './About/About.jsx';
import Help from './Help/Help.jsx';
import Login from './Login/Login.jsx';
import Register from './Register/Register.jsx';

function App() {
  return (
    <BrowserRouter>
       <Routes>
            <Route path="/" element={<HomeCredit />} />
            <Route path="/products" element={<Products />} />
            <Route path="/loans-services" element={<LoansServices />} />
            <Route path="/promos" element={<Promos />} />
            <Route path="/about-us" element={<About />} />
            <Route path="/help-center" element={<Help />} />
            <Route path="/stories" element={<HomeCredit />} /> 
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
       </Routes>
    </BrowserRouter>
  );
}

export default App;