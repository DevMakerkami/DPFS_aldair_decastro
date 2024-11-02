const User = require('../models/User');

function userLoggedMiddleware(req, res, next) {
    res.locals.isLogged = false;

    // Verificar si hay una cookie de email
    const emailInCookie = req.cookies.userEmail;
    
    if (emailInCookie) {
        // Buscar el usuario solo si hay una cookie
        const userFromCookie = User.findByField('email', emailInCookie);

        if (userFromCookie) {
            // Si se encuentra el usuario, establecer la sesión
            delete userFromCookie.password; // Por seguridad, eliminar la contraseña
            req.session.userLogged = userFromCookie;
        }
    }

    if (req.session.userLogged) {
        // Si hay un usuario logueado en la sesión, actualizar las variables locales
        res.locals.isLogged = true;
        res.locals.userLogged = req.session.userLogged;
    }

    next();
}

module.exports = userLoggedMiddleware;