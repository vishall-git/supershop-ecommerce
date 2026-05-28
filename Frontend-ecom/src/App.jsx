import {Routes,Route} from 'react-router-dom';
import Home from '/src/pages/home.jsx';
import Login from './pages/login';
import Cart from './pages/cart.jsx'
import Footer from './pages/footer';
function App() {
  return (
<Routes>
  <Route  path="/" element={<Front/>}/>
  <Route path="/cart" element={<Cart/>}/>
  <Route path="/login" element={<Login/>}/> 
</Routes>
  )
}
function Front(){
  return(
    <>
    <Home/>
    <Footer/>
    
    </>
  )
}

export default App
