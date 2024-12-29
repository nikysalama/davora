import { MercadoPagoConfig, Preference } from 'mercadopago';

// Configura el SDK con tu Access Token
const client = new MercadoPagoConfig({ accessToken: 'APP_USR-1406847872002743-121821-250086ca1c29da9c3dfc6b28e387745f-1365029203' });

export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      console.log(`title: ${req.body.title}, quanitity: ${req.body.quantity}, unit_price: ${req.body.unit_price}`);
      
      res.setHeader('Access-Control-Allow-Origin', '*');  // Permite solicitudes de cualquier origen
      res.setHeader('Access-Control-Allow-Methods', 'POST');

      const preference = new Preference(client);

      const response = await preference.create({
        body: {
          items: [
            {
              title: req.body.title,
              quantity: req.body.quantity,
              unit_price: req.body.unit_price,
            },
          ],
          payment_methods: {
            excluded_payment_methods: [
              { id: "argencard" },
              { id: "cmr" },
              { id: "cencosud" },
              { id: "diners" },
              { id: "tarshop" },
              { id: "maestro" }
            ],
            installments: 1,
          },
          back_urls: {
            success: 'https://es-la.facebook.com/login/device-based/regular/login/',
            failure: 'https://es-la.facebook.com',
            pending: 'https://www.instagram.com',
          },
          auto_return: 'approved',
        }
      });

      // Retorna la URL de pago generada
      res.status(200).json({ init_point: response.body.init_point });
    } catch (error) {
      console.error('Error creando la preferencia:', error);
      res.status(500).json({ error: 'Error al crear la preferencia' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}