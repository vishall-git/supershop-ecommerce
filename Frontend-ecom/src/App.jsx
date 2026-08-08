import { Routes, Route } from 'react-router-dom';
import Home from '/src/pages/home.jsx';
import Login from './pages/login';
import Footer from './components/Footer/footer';
import RegisterUser from './pages/RegisterUser.jsx';
import FetchCart from './pages/cart.jsx';
import ForgotPassword from './pages/ForgotPassword.jsx';
import ResetPassword from './pages/ResetPassword.jsx';
function App() {
  return (
    <Routes>
      <Route path="/" element={<Home/>} />
      <Route path="/cart" element={<FetchCart />} />  
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<RegisterUser/>}/>
      <Route path="/ForgotPassword" element={<ForgotPassword/>}/>
      <Route path="/ResetPassword" element={<ResetPassword/>}/>
    </Routes>
  )

}

export default App
