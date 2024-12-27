const mercadopago = require('mercadopago');

// Configura el SDK con tu Access Token
mercadopago.configure({
  access_token: 'APP_USR-1406847872002743-121821-250086ca1c29da9c3dfc6b28e387745f-1365029203',
});

export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      const preference = {
        items: [
          {
            title: req.body.title,
            unit_price: req.body.unit_price,
            quantity: req.body.quantity,
          },
        ],
        back_urls: {
          success: 'https://davora.vercel.app',
          failure: 'https://facebook.com',
          pending: 'https://instagram.com',
        },
        auto_return: 'approved',
      };

      const response = await mercadopago.preferences.create(preference);
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