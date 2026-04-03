const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
require('dotenv').config();

const products = require('./routes/productRoutes');
const orders = require('./routes/orderRoutes');
const { initDb } = require('./config/db');

const app = express();

initDb();

app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

app.use('/api/products', products);
app.use('/api/orders', orders);

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({
        success: false,
        message: 'Something went wrong!',
        error: process.env.NODE_ENV === 'development' ? err.message : {}
    });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`OMS Server on port ${PORT}`);
});
