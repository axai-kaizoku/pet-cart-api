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

//configure dotenv
dotenv.config();

//database configuration
connectDB();

const app = express();
const PORT = process.env.PORT || 3050;

// middlewares
app.use(cors(corsOptions));
app.use(express.json());
app.use(morgan('dev'));
app.use(express.static(path.join(__dirname, '../client/build')));

//routes
app.use('/api/v1/auth', cors(corsOptions), authRoutes);
app.use('/api/v1/category', cors(corsOptions), cateogryRoutes);
app.use('/api/v1/product', cors(corsOptions), productRoutes);

// rest api
app.use('*', cors(corsOptions), (req, res) => {
	res.send('Server is live');
});

app.listen(PORT, () => {
	console.log(`Server is running on http://localhost:${PORT}`);
});
