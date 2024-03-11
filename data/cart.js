// cart.js
export const cart = [{
  productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
  quantity: 2,
}, {
  productId: '15b6fc6f-327a-4ec4-896f-486349e85a3d',
  quantity: 1,
}];

export function addToCart(cart, productId, quantity) {
  let matchingItem;

  cart.forEach((cartItem) => {
    if (productId === cartItem.productId) {
      matchingItem = cartItem;
    }
  });

  if (matchingItem) {
    matchingItem.quantity += quantity;
  } else {
    cart.push({productId: productId, quantity: quantity});
  }
};

export function initializeButtons() {
  let deleteButtons = document.querySelectorAll('.js-delete-link');
  let updateButtons = document.querySelectorAll('.update-quantity-link');

  deleteButtons.forEach((button) => {
    button.addEventListener('click', (event) => {
      let quantityLabel = button.parentElement.querySelector('.quantity-label');
      let quantity = parseInt(quantityLabel.textContent);

      if (quantity > 1) {
        quantityLabel.textContent = quantity - 1;
      }
      else if (quantity === 1) {
        button.closest('.cart-item-container').remove();
      }
    });
  });

  updateButtons.forEach((button) => {
    button.addEventListener('click', (event) => {
      let select = document.createElement('select');
      for (let i = 1; i <= 9; i++) {
        let option = document.createElement('option');
        option.value = i;
        option.text = i;
        select.appendChild(option);
      }
      let option = document.createElement('option');
      option.value = '10+';
      option.text = '10+';
      select.appendChild(option);
      button.replaceWith(select);

      select.addEventListener('change', (event) => {
        let quantityLabel = select.parentElement.querySelector('.quantity-label');
        if (event.target.value === '10+') {
          let input = document.createElement('input');
          input.type = 'number';
          input.min = '1';
          input.size = '2';
          input.maxLength = '2';
          select.replaceWith(input);

          input.addEventListener('blur', (event) => {
            quantityLabel.textContent = event.target.value;
            input.replaceWith(button);
          });
        } else {
          quantityLabel.textContent = event.target.value;
          select.replaceWith(button);
        }
      });
    });
  });
}







