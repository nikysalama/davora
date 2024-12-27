import React, {useState} from 'react';
import './Product.css'; // Asegúrate de crear este archivo para estilos personalizados si lo necesitas
import cartLogo from '../assets/carrito.png';
import { useCart } from '../CartContext';

const Product = ({id, image, name, price, stock }) => {
  const { addToCart } = useCart();

  const [showNoStockMessage, setShowNoStockMessage] = useState(false);
  const [showCartLogo, setShowCartLogo] = useState(false);

  const handleAddToCart = () => {
    const wasAdded = addToCart({ id, name, price, image, stock });

    if(wasAdded){
      setShowCartLogo(true);
      setTimeout(() => {
        setShowCartLogo(false);
      }, 700);
      setShowNoStockMessage(false);
    } else{
      console.log("no stock");
      setShowNoStockMessage(true);
      setTimeout(() => {
          setShowNoStockMessage(false);
      }, 1000);
    }
  }

  return (
    <div className="product-card">
      <div className="product-overlay">
        {stock === 0 && <div className="out-of-stock-message">SIN STOCK</div>}
        <img src={image} alt={name} className="product-image" />
        {showNoStockMessage && (
          <div className='no-more-stock-overlay'>
            <p className="no-more-stock-message">SIN MÁS STOCK</p>
          </div>
        )}
      </div>
      <div className="product-details">
        <h2 className="product-name">{name}</h2>
        <p className="product-price">${price.toFixed(2)}</p>
        <button className='add-to-cart-button' onClick={handleAddToCart} disabled={stock === 0}>
          Agregar a carrito
        </button>
        {showCartLogo && (
          <div className="cart-logo-overlay">
            <img src={cartLogo} alt="Carrito" className="cart-logo" />
          </div>
        )}
      </div>
    </div>
  );
};

export default Product;
