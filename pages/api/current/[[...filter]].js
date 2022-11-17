export default function handler(req, res) {
    const { filter } = req.query;
    res.status(200).json({ Target : filter.split('/') });
}
