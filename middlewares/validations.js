const { body } = require('express-validator');
const path = require('path');

module.exports = {
    register: [
        body('name').notEmpty().withMessage('Debes completar el nombre'),
        body('email')
            .notEmpty().withMessage('Debes completar el email').bail()
            .isEmail().withMessage('Debes ingresar un email válido'),
        body('password').notEmpty().withMessage('Debes completar la contraseña'),
        body('avatar').custom((value, { req }) => {
            let file = req.file;
            let acceptedExtensions = ['.jpg', '.png', '.gif'];
            
            if (!file) {
                throw new Error('Tienes que subir una imagen');
            } else {
                let fileExtension = path.extname(file.originalname);
                if (!acceptedExtensions.includes(fileExtension)) {
                    throw new Error(`Las extensiones de archivo permitidas son ${acceptedExtensions.join(', ')}`);
                }
            }
            return true;
        })
    ],
    login: [
        body('email')
            .notEmpty().withMessage('Debes completar el email').bail()
            .isEmail().withMessage('Debes ingresar un email válido'),
        body('password').notEmpty().withMessage('Debes completar la contraseña')
    ]
}