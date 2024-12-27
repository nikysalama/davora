// CartContext.js
import React, { createContext, useState, useContext, useEffect } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from './firebaseConfig.jsx';

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        // Obtén la colección 'products' desde Firestore
        const querySnapshot = await getDocs(collection(db, 'products'));
        const formattedData = querySnapshot.docs.map(doc => ({
          id: doc.id,  // Usa el ID del documento en Firestore como ID
          ...doc.data(), // Obtén todos los campos del documento
          price: parseFloat(doc.data().price), //porlas
          stock: parseInt(doc.data().stock) //porlas
        }));

        setProducts(formattedData);
      } catch (error) {
        console.error('Error al obtener los productos de Firestore:', error);
      }
    };

    fetchProducts();
  }, []);

  const [cartItems, setCartItems] = useState([]);
  const [isCartButtonClicked, setIsCartButtonClicked] = useState(false);

  const addToCart = (product) => {
    let wasAdded = false;
    let updatedCartItems;

    setCartItems(prevItems => {
      const existingProduct = prevItems.find(item => item.id === product.id);
      if (existingProduct) {
        if (existingProduct.quantity < product.stock) {
          wasAdded = true;
          updatedCartItems = prevItems.map(item =>
            item.id === product.id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          );
        } else {
          updatedCartItems = prevItems;
        }
      } else {
        wasAdded = true;
        updatedCartItems = [...prevItems, { ...product, quantity: 1, stock: product.stock }];
      }

      return updatedCartItems;
    });

    return wasAdded;
  };
  const deleteAllItems = () => {
    setCartItems([]);
  }

  return (
    <CartContext.Provider value={{ cartItems, addToCart, isCartButtonClicked, setIsCartButtonClicked, setCartItems, products, deleteAllItems }}>
      {children}
    </CartContext.Provider>
  );
};
