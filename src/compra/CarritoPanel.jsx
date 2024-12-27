import React from 'react';
import './CarritoPanel.css';
import { useCart } from '../CartContext';
import trashIcon from '../assets/trash_icon.svg';

import { useNavigate } from 'react-router-dom';

const CarritoPanel = () => {
    const { cartItems, setIsCartButtonClicked, setCartItems } = useCart();
    const navigate = useNavigate();

    const handleClose = () => {
        setIsCartButtonClicked(false); // Cierra el panel
    };
    
    const total = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

  const updateQuantity = (id, newQuantity, stock) => {
      if (newQuantity < 1 || isNaN(newQuantity) || newQuantity > stock) return; // Evita cantidades negativas o cero
      setCartItems(prevItems => 
          prevItems.map(item =>
              item.id === id ? { ...item, quantity: newQuantity } : item
          )
      );
  };

  const increaseQuantity = (id) => {
      setCartItems(prevItems => 
          prevItems.map(item =>
              (item.id === id && item.stock > 0) ? { ...item, quantity: item.quantity + 1 } : item
          )
      );
  };

  const decreaseQuantity = (id) => {
      setCartItems(prevItems => 
          prevItems.map(item =>
              item.id === id ? { ...item, quantity: item.quantity - 1 } : item
          )
      );
  };

  const removeItem = (id) => {
    setCartItems(prevItems => prevItems.filter(item => item.id !== id));
  };

  const handleBuyClick = () => {
    setIsCartButtonClicked(false);
    navigate('/compra');
  };

  return (
    <div className="carrito-panel">
      <button className="close-button" onClick={handleClose}>X</button>
      <h2 className='panel-title'>Carrito</h2>
      <ul className='items-container'>
        {cartItems.map(item => (
          <li key={item.id} className='item'>
            <img src={item.image} alt={item.name} className="item-image" />
            <div className="item-details">
              <p>{item.name}</p>
              <p>${item.price.toFixed(2)}</p>
              <div className='quantity-control'>
                <button onClick={() => decreaseQuantity(item.id)} disabled={item.quantity === 1}>-</button>
                <input
                  type='integer'
                  value={item.quantity}
                  onChange={(e) => updateQuantity(item.id, Number(e.target.value), item.stock)}
                  min='1'
                />
                <button onClick={() => increaseQuantity(item.id)} disabled={item.stock === item.quantity}>+</button>
              </div>
            </div>
            <button className='remove-button' onClick={() => removeItem(item.id)}>
              <img src={trashIcon} alt='Eliminar' />
            </button>
          </li>
        ))}
      </ul>
      <div className="total">
        <p>Total: ${total.toFixed(2)}</p>
      </div>
      {cartItems.length > 0 && (
        <button className='buy-button' onClick={handleBuyClick}>
          Realizar Compra
        </button>
      )}
    </div>
  );
};

export default CarritoPanel;
