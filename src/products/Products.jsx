import React from 'react';
import Product from './Product';
import './Products.css'; // Asegúrate de crear este archivo para estilos personalizados
import { useCart } from '../CartContext';

const Products = () => {
  const { products } = useCart();

  return (
    <div className='product-grid'>
      {products.map((product) => (
        <Product 
          key={product.id}
          image={product.image}
          name={product.name}
          price={product.price}
          stock={product.stock}
          id={product.id}
        />
      ))}
    </div>
  );
};

export default Products;
