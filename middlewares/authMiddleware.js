/*exports.isAdmin = (req, res, next) => {
    // Aquí deberías implementar la lógica real de autenticación
    // Por ahora, usaremos una versión simplificada
    if (req.session && req.session.user && req.session.user.category === 'admin') {
      next();
    } else {
      res.status(403).send('Acceso denegado. Solo administradores pueden acceder a esta página.');
    }
  };
  */