const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.DB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Połączono z MongoDB');
  } catch (err) {
    console.error('Błąd połączenia:', err.message);
    process.exit(1);
  }
};

module.exports = connectDB;
