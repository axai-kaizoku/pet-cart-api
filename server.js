const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
const connectDB = require('./database/index');
const authRoutes = require('./routes/authRoutes');
const cateogryRoutes = require('./routes/categoryRoutes');
const productRoutes = require('./routes/productRoutes');
const cors = require('cors');
const corsOptions = require('./config/corsOptions');
const path = require('path');
const httpProxy = require('http-proxy');

//configure dotenv
dotenv.config();

//database configuration
connectDB();

const app = express();
const PORT = process.env.PORT || 3050;
const proxy = httpProxy.createProxyServer();

// middlewares
app.use(cors(corsOptions));
app.use(express.json());
app.use(morgan('dev'));
// app.use(express.static(path.join(__dirname, './client/build')));

//cors
app.options();

//routes
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/category', cateogryRoutes);
app.use('/api/v1/product', productRoutes);

// rest api
app.use('*', (req, res) => {
	proxy.web(req, res, {
		target: 'https://petcart-y1o1.onrender.com', // Replace with your client's port
	});
});

// function (req, res) {
// 	res.sendFile(path.join(__dirname, './client/build/index.html'));
// }

app.listen(PORT, () => {
	console.log(`Server is running!!`);
});
