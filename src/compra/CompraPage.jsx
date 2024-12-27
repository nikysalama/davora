import React, { useRef, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './CompraPage.css'
import logo from '../assets/logo_compra.svg';
import { useCart } from '../CartContext';
import validator from 'validator';
import logoMp from '../assets/logo_mp.png';
import logoBancario from '../assets/logo_bancario.png';
import Modal from '../Modal';

import emailjs from 'emailjs-com';

import { updateStock } from '../stockUtils';

import { initMercadoPago, Wallet } from "@mercadopago/sdk-react";

initMercadoPago("APP_USR-ad84ba5a-63fe-446b-a8cf-173c0f8b2187");

emailjs.init('MDTlBytvmJtkAizUe');

const CompraPage = () => {
    const { cartItems } = useCart();
    const [showPaymentOptions, setShowPaymentOptions] = useState(false);
    const [emailError, setEmailError] = useState(false);
    const [buttonText, setButtonText] = useState('Continuar');
    const [nameError, setNameError] = useState(false);
    const [showData, setTransData] = useState(false);
    const [showEfectingBuyModal, setShowEfectingBuyModal] = useState(false);
    const [errorModalMessage, setErrorModalMessage] = useState('');
    const [showErrorModal, setShowErrorModal] = useState(false);

    const [preferenceId, setPreferenceId] = useState(null);

    const navigate = useNavigate();

    const emailRef = useRef(null);
    const nameRef = useRef(null);
    const regex = /^[A-Za-z\s]+$/;

    const total = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

    useEffect(() => {
        // Llama al backend para obtener el preferenceId
        const fetchPreferenceId = async () => {
            try {
                const response = await fetch('/api/mercado-pago', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        title: 'Producto de ejemplo',
                        unit_price: 100,
                        quantity: 1,
                    }),
                });

                if (!response.ok) {
                    throw new Error('Error al crear la preferencia');
                }

                const data = await response.json();
                setPreferenceId(data.preferenceId);  // Guarda el preferenceId del backend
            } catch (error) {
                console.error('Error al crear la preferencia:', error);
                alert('Hubo un problema al iniciar el pago. Inténtalo nuevamente.');
            }
        };

        fetchPreferenceId();
    }, []);

    useEffect(() => {
        // Inicializa el SDK de Mercado Pago con tu clave pública
        initMercadoPago('APP_USR-ad84ba5a-63fe-446b-a8cf-173c0f8b2187', { locale: 'es-AR' });
    }, []);

    const handleContinue = () => {
        const email = emailRef.current.value;
        const name = nameRef.current.value;
        const isNameValid = regex.test(name);

        const isEmailValid = validator.isEmail(email);

        setEmailError(!isEmailValid);
        setNameError(!isNameValid);

        if (isEmailValid && isNameValid) {
            setShowPaymentOptions(true);
            setButtonText('Actualizar Datos');
        } else {
            setShowPaymentOptions(false);
            setButtonText('Continuar');
        }
    };

    const sendEmail = () => {
        const templateParams = {
            to_email: emailRef.current.value,
            nro_orden: 0,
            name: nameRef.current.value,
            total: total.toFixed(2)
        };

        emailjs.send('service_cyhyv4d', 'template_00jmw4e', templateParams)
            .then((response) => {
                console.log('Correo enviado:', response);
            })
            .catch((error) => {
                console.error('Error al enviar el correo:', error);
            });
    };

    const handleConfirmar = async () => {
        setShowEfectingBuyModal(true); // Mostrar modal "Efectuando compra"
        try {
            await updateStock(cartItems); // Ahora lanza un error si algo falla
            sendEmail();
            navigate('/compra/finalizada');
        } catch (error) {
            // Capturar el error y mostrar el modal de error
            setErrorModalMessage(error.message); // Establecer el mensaje del error
            setShowErrorModal(true); // Mostrar el modal de error
        } finally {
            setShowEfectingBuyModal(false); // Ocultar modal "Efectuando compra"
        }
    };

    const handleCloseErrorModal = () => {
        setShowErrorModal(false); // Cerrar modal de error
    };

    const handleTransBancaria = () => {
        setShowPaymentOptions(false);
        setTransData(true);
    }

    const handleRegresar = () => {
        setShowPaymentOptions(true);
        setTransData(false);
    }

    const handleMercadoPagoPayment = async () => {
        console.log("se clickeo Mercado Pago");
        try {
            // Datos de ejemplo para los productos
            const products = [
                { title: "Producto 1", quantity: 1, unit_price: 100 },
                { title: "Producto 2", quantity: 2, unit_price: 50 },
            ];

            const response = await fetch('/api/mercado-pago', {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    title: 'Producto de ejemplo',
                    unit_price: 100,
                    quantity: 1,
                }),
            });
            // Llamar al backend para generar el enlace de pago
            /*const response = await fetch('/api/mercado-pago', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                items: products, // Enviar productos al backend
                email: "comprador@example.com", // Email del comprador
              }),
            });*/

            if (!response.ok) {
                throw new Error("Error al crear la preferencia");
            }

            const data = await response.json();

            // Redirigir al usuario al flujo de pago de Mercado Pago
            window.location.href = data.init_point; // Redirige automáticamente al flujo de pago
        } catch (error) {
            console.error("Error al iniciar el pago:", error);
            alert("Hubo un problema al iniciar el pago. Inténtalo nuevamente.");
        }
    };

    return (
        <div className='compra'>
            <div className='logo-navbar'>
                <img src={logo} alt="Logo Emine" className="compra-logo" onClick={() => navigate("/")} />
            </div>
            <div className="compra-page">
                <div className="left-section">
                    <div className="email-section">
                        <label htmlFor="email" className="email-label">EMAIL</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            className="email-input"
                            placeholder="Introduce tu email"
                            ref={emailRef}
                        />
                        <p className="email-error">{emailError ? "Mail inválido" : "\u00A0"}</p>
                    </div>
                    <div className="email-section">
                        <label htmlFor="name" className="name-label">NOMBRE COMPLETO</label>
                        <input
                            type="name"
                            id="name"
                            name="name"
                            className="email-input"
                            placeholder="Introduce tu nombre completo"
                            ref={nameRef}
                        />
                        <p className="email-error">{nameError ? "Nombre inválido" : "\u00A0"}</p>
                    </div>
                    {!showData && (<button className='continuar-button' onClick={handleContinue}>{buttonText}</button>)}
                    {showPaymentOptions && (
                        <div>
                            <p className='pago-label'>METODO DE PAGO: </p>
                            <div className="payment-options">
                                {/* Botón de Mercado Pago modificado para usar el Wallet */}
                                {preferenceId ? (
                                    <div className="payment-button">
                                        <Wallet initialization={{ preferenceId }} /> {/* Renderiza el Wallet con preferenceId */}
                                    </div>
                                ) : (
                                    <p>Cargando...</p> // Mensaje mientras se obtiene el preferenceId
                                )}
                                <button className="payment-button" onClick={handleTransBancaria}>
                                    <img src={logoBancario} alt="Transferencia Bancaria" className="payment-icon" />
                                    Transferencia Bancaria
                                </button>
                            </div>
                        </div>
                    )}
                    {showData && (
                        <div className='trans-confirmed'>
                            <p className='trans-data'>
                                Se enviara un mail con los datos para realizar la transferencia y comunicarse para acordar el modo de envio o retiro de los productos.
                            </p>
                            <button className='trans-confirm-button' onClick={handleConfirmar}>CONFIRMAR</button>
                            <button className='trans-confirm-button' onClick={handleRegresar}>REGRESAR</button>
                        </div>
                    )}
                </div>
                <div className="right-section">
                    <h2 className='title'>Lista de Productos</h2>
                    <ul className="product-list">
                        {cartItems.map(item => (
                            <li key={item.id} className="item">
                                <img src={item.image} alt={item.name} className="item-image" />
                                <div className="compra-details">
                                    <p className='item-name-quantity'>{item.name} x {item.quantity}</p>
                                    <p className="item-price">
                                        ${(item.price * item.quantity).toFixed(2)}
                                    </p>
                                </div>
                            </li>
                        ))}
                    </ul>
                    <div className="total-compra">
                        <p>TOTAL: ${total.toFixed(2)}</p>
                    </div>
                </div>
            </div>
            {showEfectingBuyModal && (
                <Modal onClose={() => { }} disableClose>
                    <p>Efectuando compra, por favor espera...</p>
                </Modal>
            )}

            {/* Modal de error */}
            {showErrorModal && (
                <Modal onClose={handleCloseErrorModal} isError={true}>
                    <p>{errorModalMessage}</p>
                </Modal>
            )}
        </div>
    );
};

export default CompraPage;