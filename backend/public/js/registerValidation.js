// public/js/registerValidation.js

document.addEventListener('DOMContentLoaded', function() {
    const form = document.querySelector('#registerForm');
    
    form.addEventListener('submit', function(e) {
      let errors = [];
  
      // Validar nombre y apellido
      const firstName = document.querySelector('#firstName').value;
      const lastName = document.querySelector('#lastName').value;
      if (firstName.length < 2) errors.push('El nombre debe tener al menos 2 caracteres');
      if (lastName.length < 2) errors.push('El apellido debe tener al menos 2 caracteres');
  
      // Validar email
      const email = document.querySelector('#email').value;
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) errors.push('Ingrese un email válido');
  
      // Validar contraseña
      const password = document.querySelector('#password').value;
      if (password.length < 8) errors.push('La contraseña debe tener al menos 8 caracteres');
  
      // Validar imagen
      const avatar = document.querySelector('#avatar').files[0];
      if (avatar) {
        const acceptedExtensions = ['jpg', 'jpeg', 'png', 'gif'];
        const fileExtension = avatar.name.split('.').pop().toLowerCase();
        if (!acceptedExtensions.includes(fileExtension)) {
          errors.push('El archivo debe ser una imagen válida (JPG, JPEG, PNG, GIF)');
        }
      }
  
      if (errors.length > 0) {
        e.preventDefault();
        const errorDiv = document.querySelector('#errors');
        errorDiv.innerHTML = errors.join('<br>');
      }
    });
  });
  
 