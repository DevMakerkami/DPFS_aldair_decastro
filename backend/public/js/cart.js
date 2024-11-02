document.addEventListener('DOMContentLoaded', () => {
  const quantityInputs = document.querySelectorAll('.item-quantity input');
  const removeButtons = document.querySelectorAll('.remove-item');
  const cartCount = document.getElementById('cartCount');

  quantityInputs.forEach(input => {
    input.addEventListener('change', async () => {
      const productId = input.dataset.id;
      const quantity = input.value;

      try {
        const response = await fetch('/cart/update', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ productId, quantity }),
        });

        const data = await response.json();

        if (data.success) {
          // Update the cart total
          location.reload();
        } else {
          alert('Failed to update cart.');
        }
      } catch (error) {
        console.error('Error:', error);
        alert('An error occurred while updating the cart.');
      }
    });
  });

  removeButtons.forEach(button => {
    button.addEventListener('click', async () => {
      const productId = button.dataset.id;

      try {
        const response = await fetch('/cart/remove', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ productId }),
        });

        const data = await response.json();

        if (data.success) {
          cartCount.textContent = data.cartSize;
          // Remove the item from the DOM
          button.closest('.cart-item').remove();
          // Update the cart total
          location.reload();
        } else {
          alert('Failed to remove item from cart.');
        }
      } catch (error) {
        console.error('Error:', error);
        alert('An error occurred while removing the item from cart.');
      }
    });
  });
});