import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import './Navbar.css';
import logo from '../assets/logo_emine.svg';

import { useCart } from '../CartContext';

const Navbar = () => {
  const { cartItems, isCartButtonClicked, setIsCartButtonClicked } = useCart();
  const [hasShadow, setHasShadow] = useState(false);

  const cartCount = cartItems.reduce((total, item) => total + item.quantity, 0);

  const handleCartClick = () => {
    setIsCartButtonClicked(!isCartButtonClicked); // Modificar el estado global
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setHasShadow(true);
      } else {
        setHasShadow(false);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <nav className={`navbar ${hasShadow ? 'navbar-shadow' : ''}`}>
      <NavLink to='/' className='logo-link'>
        <img src={logo} alt='Logo' className='logo' />
      </NavLink>
      <div className='nav-links'>
        <NavLink
          to='/'
          className={({ isActive }) => `link ${isActive ? 'active-link' : ''}`}
          exact="true"
        >
          Inicio
        </NavLink>
        <NavLink
          to='/products'
          className={({ isActive }) => `link ${isActive ? 'active-link' : ''}`}
        >
          Productos
        </NavLink>
        <NavLink
          to='/about'
          className={({ isActive }) => `link ${isActive ? 'active-link' : ''}`}
        >
          Quienes Somos
        </NavLink>
      </div>
      <button className='carro-button' onClick={handleCartClick}>
        <span className='cart-count'>{cartCount}</span>
      </button>
    </nav>
  );
};

export default Navbar;
