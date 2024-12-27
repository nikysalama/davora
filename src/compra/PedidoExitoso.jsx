import React from 'react';
import logo from '../assets/logo_compra.svg'; 
import { useNavigate } from 'react-router-dom';
import { useCart } from '../CartContext';

const PedidoExitoso = () => {
  const navigate = useNavigate();
  const { deleteAllItems } = useCart();

  const returnHomePage = () => {
    deleteAllItems();
    navigate("/");
  }

  return (
    <div>
      <div className='logo-navbar'>
          <img src={logo} alt="Logo Emine" className="compra-logo-" onClick={returnHomePage}/>
      </div>
      <h1 style={{ margin: '1em', fontFamily: 'Montserrat', fontWeight: '500'}}>
          El pedido se ha logrado con exito, se envio un mail con los detalles para realizar el pago. Recordar revisar spam.
      </h1>
    </div>
  );
};

export default PedidoExitoso;
