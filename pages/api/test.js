export default function handler(req, res) {
    res.status(200).json({ message: 'Endpoint funcionando correctamente', method: req.method });
}