const { User } = require('../models');
const bcrypt = require('bcrypt');
const { registerValidations, loginValidations } = require('../middlewares/validations');
const userController = {
  // Mostrar formulario de registro
  registerForm: (req, res) => {
    res.render('users/register');
  },

  // Registrar un nuevo usuario
  register: async (req, res) => {
    try {
      const { firstName, lastName, email, password, category } = req.body;
      const hashedPassword = await bcrypt.hash(password, 10);
      const user = await User.create({
        firstName,
        lastName,
        email,
        password: hashedPassword,
        category,
        image: req.file ? req.file.filename : null
      });
      res.redirect('/users/login');
    } catch (error) {
      res.status(400).render('users/register', { error: error.message });
    }
  },

  // Mostrar formulario de login
  loginForm: (req, res) => {
    res.render('users/login');
  },

  // Iniciar sesión
  login: async (req, res) => {
    try {
      const { email, password } = req.body;
      const user = await User.findOne({ where: { email } });
      if (!user) {
        return res.status(401).render('users/login', { error: 'Credenciales inválidas' });
      }
      const isValid = await bcrypt.compare(password, user.password);
      if (!isValid) {
        return res.status(401).render('users/login', { error: 'Credenciales inválidas' });
      }
      // Aquí deberías generar un token JWT y guardarlo en la sesión
      req.session.userId = user.id;
      res.redirect('/users/profile');
    } catch (error) {
      res.status(500).render('users/login', { error: error.message });
    }
  },

  // Mostrar perfil de usuario
  profile: async (req, res) => {
    try {
      const user = await User.findByPk(req.session.userId, {
        attributes: { exclude: ['password'] }
      });
      if (user) {
        res.render('users/profile', { user });
      } else {
        res.status(404).render('error', { message: 'Usuario no encontrado' });
      }
    } catch (error) {
      res.status(500).render('error', { message: error.message });
    }
  },

  // Cerrar sesión
  logout: (req, res) => {
    req.session.destroy((err) => {
      if (err) {
        return res.status(500).render('error', { message: 'Error al cerrar sesión' });
      }
      res.redirect('/');
    });
  },

  // Actualizar perfil de usuario (no está en las rutas actuales, pero podría ser útil)
  updateProfile: async (req, res) => {
    try {
      const [updated] = await User.update(req.body, {
        where: { id: req.session.userId }
      });
      if (updated) {
        const updatedUser = await User.findByPk(req.session.userId, {
          attributes: { exclude: ['password'] }
        });
        res.render('users/profile', { user: updatedUser, message: 'Perfil actualizado con éxito' });
      } else {
        res.status(404).render('error', { message: 'Usuario no encontrado' });
      }
    } catch (error) {
      res.status(400).render('users/profile', { error: error.message });
    }
  }
};

module.exports = userController;