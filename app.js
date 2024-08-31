const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Configuración
app.use(express.static('public'));

// Rutas
app.get('/', (req, res) => {
    res.sendFile(path.join(dirname, 'views', 'index.html'));
});

app.get('/product/:id', (req, res) => {
    res.sendFile(path.join(dirname, 'views', 'productDetail.html'));
});

app.get('/cart', (req, res) => {
    res.sendFile(path.join(dirname, 'views', 'productCart.html'));
});

app.get('/register', (req, res) => {
    res.sendFile(path.join(dirname, 'views', 'register.html'));
});

app.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'login.html'));
});

app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});