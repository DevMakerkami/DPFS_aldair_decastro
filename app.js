const express = require('express');
const path = require('path');
const methodOverride = require('method-override');
const session = require('express-session');
const app = express();

// Set up EJS as the view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Middleware
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));
app.use(session({
    secret: 'your-secret-key',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false } // set to true if using https
  }));
// Routes
const homeRoutes = require('./routes/homeRoutes');
const productRoutes = require('./routes/productRoutes');
const cartRoutes = require('./routes/cartRoutes');
const userRoutes = require('./routes/userRoutes');

app.use('/', homeRoutes);
app.use('/products', productRoutes);
app.use('/cart', cartRoutes);
app.use('/user', userRoutes);



module.exports = app;