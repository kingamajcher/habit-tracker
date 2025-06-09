module.exports = (req, res, next) => {
  if (req.user.role !== 'admin') {
    return res.status(403).json({ message: 'Brak dostępu – zawartość dostępna tylko dla admina' });
  }
  next();
};
