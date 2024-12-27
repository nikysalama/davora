import './App.css';
import Navbar from './navbar/Navbar';
import Products from './products/Products';
import Home from './home/Home';
import About from './About';
import PedidoExitoso from './compra/PedidoExitoso';

import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';

import { useCart } from './CartContext';
import CarritoPanel from './compra/CarritoPanel';
import CompraPage from './compra/CompraPage';

function App() {
  const { isCartButtonClicked } = useCart();
  const location = useLocation();

  const showNavbar = !location.pathname.startsWith('/compra');;

  return (
      <>
        {isCartButtonClicked && <div className='overlay'></div>}
        <div style={{marginBottom: '1rem'}}>
          {showNavbar && <Navbar />}
        </div>
        <div className='content'>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Products />} />
          <Route path="/about" element={<About />} />
          <Route path="/compra" element={<CompraPage />} />
          <Route path="/compra/finalizada" element={<PedidoExitoso />} />
        </Routes>
        </div>
        {isCartButtonClicked && <CarritoPanel />}
      </>
  );
}

export default App
