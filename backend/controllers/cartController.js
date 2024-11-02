const { Cart, CartItem, Product } = require('../models');

const cartController = {
  // Obtener el carrito de un usuario
  getCart: async (req, res) => {
    try {
      const cart = await Cart.findOne({
        where: { user_id: req.user.id },
        include: [{ 
          model: Product,
          through: { attributes: ['quantity'] }
        }]
      });
      if (!cart) {
        return res.status(404).json({ message: 'Carrito no encontrado' });
      }
      res.json(cart);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  // Añadir un producto al carrito
  addToCart: async (req, res) => {
    try {
      const { productId, quantity } = req.body;
      let [cart, created] = await Cart.findOrCreate({
        where: { user_id: req.user.id }
      });

      const [cartItem, itemCreated] = await CartItem.findOrCreate({
        where: { cart_id: cart.id, product_id: productId },
        defaults: { quantity: quantity }
      });

      if (!itemCreated) {
        cartItem.quantity += quantity;
        await cartItem.save();
      }

      res.status(201).json(cartItem);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },

  // Actualizar la cantidad de un producto en el carrito
  updateCart: async (req, res) => {
    try {
      const { productId, quantity } = req.body;
      const cart = await Cart.findOne({ where: { user_id: req.user.id } });
      if (!cart) {
        return res.status(404).json({ message: 'Carrito no encontrado' });
      }

      const cartItem = await CartItem.findOne({
        where: { cart_id: cart.id, product_id: productId }
      });

      if (!cartItem) {
        return res.status(404).json({ message: 'Producto no encontrado en el carrito' });
      }

      cartItem.quantity = quantity;
      await cartItem.save();

      res.json(cartItem);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },

  // Eliminar un producto del carrito
  removeFromCart: async (req, res) => {
    try {
      const { productId } = req.body;
      const cart = await Cart.findOne({ where: { user_id: req.user.id } });
      if (!cart) {
        return res.status(404).json({ message: 'Carrito no encontrado' });
      }

      const deleted = await CartItem.destroy({
        where: { cart_id: cart.id, product_id: productId }
      });

      if (deleted) {
        res.status(204).send();
      } else {
        res.status(404).json({ message: 'Producto no encontrado en el carrito' });
      }
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
};

module.exports = cartController;