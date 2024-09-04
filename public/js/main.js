document.addEventListener('DOMContentLoaded', () => {
    const addToCartButtons = document.querySelectorAll('.add-to-cart');
    const cartCount = document.getElementById('cartCount');
  
    addToCartButtons.forEach(button => {
      button.addEventListener('click', async () => {
        const productId = button.dataset.id;
        const quantity = document.getElementById('quantity') ? document.getElementById('quantity').value : 1;
  
        try {
          const response = await fetch('/cart/add', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ productId, quantity }),
          });
  
          const data = await response.json();
  
          if (data.success) {
            cartCount.textContent = data.cartSize;
            alert('Producto agregado Exitosamente!');
          } else {
            alert('Fallo al agregar al carrito.');
          }
        } catch (error) {
          console.error('Error:', error);
          alert('A ocurrido un error al agregar al carro.');
        }
      });
    });
  });