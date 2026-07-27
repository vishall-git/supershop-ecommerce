import { BrowserRouter } from 'react-router-dom';
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { LoginProvider }  from './context/AuthContext.jsx';
import CountContext from './context/CountContext.jsx';
import { PaymentProvider } from './context/CheckoutContexf.jsx';

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
  <LoginProvider>
    <PaymentProvider>
    <CountContext>
      <div className='overflow-hidden'>
        <App />
      </div>
    </CountContext>
    </PaymentProvider>
    </LoginProvider>
  </BrowserRouter>

)
