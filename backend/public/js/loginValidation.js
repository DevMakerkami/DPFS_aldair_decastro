   document.addEventListener('DOMContentLoaded', function() {
    const form = document.querySelector('#loginForm');
    
    form.addEventListener('submit', function(e) {
      let errors = [];
  
      // Validar email
      const email = document.querySelector('#email').value;
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) errors.push('Ingrese un email válido');
  
      // Validar contraseña
      const password = document.querySelector('#password').value;
      if (password.length === 0) errors.push('La contraseña es obligatoria');
  
      if (errors.length > 0) {
        e.preventDefault();
        const errorDiv = document.querySelector('#errors');
        errorDiv.innerHTML = errors.join('<br>');
      }
    });
  });
  
  // public/js/productValidation.js
  
  document.addEventListener('DOMContentLoaded', function() {
    const form = document.querySelector('#productForm');
    
    form.addEventListener('submit', function(e) {
      let errors = [];
  
      // Validar nombre
      const name = document.querySelector('#name').value;
      if (name.length < 5) errors.push('El nombre debe tener al menos 5 caracteres');
  
      // Validar descripción
      const description = document.querySelector('#description').value;
      if (description.length < 20) errors.push('La descripción debe tener al menos 20 caracteres');
  
      // Validar imagen
      const image = document.querySelector('#image').files[0];
      if (image) {
        const acceptedExtensions = ['jpg', 'jpeg', 'png', 'gif'];
        const fileExtension = image.name.split('.').pop().toLowerCase();
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