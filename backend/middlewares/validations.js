// middlewares/validations.js

const { body, validationResult } = require('express-validator');

const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

const registerValidations = [
  body('firstName').notEmpty().withMessage('El nombre es obligatorio').isLength({ min: 2 }).withMessage('El nombre debe tener al menos 2 caracteres'),
  body('lastName').notEmpty().withMessage('El apellido es obligatorio').isLength({ min: 2 }).withMessage('El apellido debe tener al menos 2 caracteres'),
  body('email').notEmpty().withMessage('El email es obligatorio').isEmail().withMessage('Debe ser un email válido').custom(async (value) => {
    const user = await User.findOne({ where: { email: value } });
    if (user) {
      throw new Error('El email ya está registrado');
    }
  }),
  body('password').notEmpty().withMessage('La contraseña es obligatoria').isLength({ min: 8 }).withMessage('La contraseña debe tener al menos 8 caracteres'),
  body('avatar').custom((value, { req }) => {
    if (!req.file) return true;
    const acceptedExtensions = ['.jpg', '.jpeg', '.png', '.gif'];
    const fileExtension = path.extname(req.file.originalname);
    if (!acceptedExtensions.includes(fileExtension)) {
      throw new Error('El archivo debe ser una imagen válida (JPG, JPEG, PNG, GIF)');
    }
    return true;
  }),
  handleValidationErrors
];

const loginValidations = [
  body('email').notEmpty().withMessage('El email es obligatorio').isEmail().withMessage('Debe ser un email válido'),
  body('password').notEmpty().withMessage('La contraseña es obligatoria'),
  handleValidationErrors
];

const productValidations = [
  body('name').notEmpty().withMessage('El nombre es obligatorio').isLength({ min: 5 }).withMessage('El nombre debe tener al menos 5 caracteres'),
  body('description').isLength({ min: 20 }).withMessage('La descripción debe tener al menos 20 caracteres'),
  body('image').custom((value, { req }) => {
    if (!req.file) return true;
    const acceptedExtensions = ['.jpg', '.jpeg', '.png', '.gif'];
    const fileExtension = path.extname(req.file.originalname);
    if (!acceptedExtensions.includes(fileExtension)) {
      throw new Error('El archivo debe ser una imagen válida (JPG, JPEG, PNG, GIF)');
    }
    return true;
  }),
  handleValidationErrors
];

module.exports = {
  registerValidations,
  loginValidations,
  productValidations
};