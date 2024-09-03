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
            alert('Product added to cart!');
          } else {
            alert('Failed to add product to cart.');
          }
        } catch (error) {
          console.error('Error:', error);
          alert('An error occurred while adding the product to cart.');
        }
      });
    });
  });