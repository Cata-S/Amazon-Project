import {cart} from '../data/cart.js';
import {products} from '../data/products.js';
import { formatMoney } from '../utils/money.js';

let cartSummaryHTML = '';

cart.forEach((cartItem) => {
  const productId = cartItem.productId;

  let matchingProduct;

  products.forEach((product) => {
    if (product.id === productId) {
      matchingProduct = product;
    }
  });

cartSummaryHTML += `
<div class="cart-item-container">
  <div class="delivery-date">
    Delivery date: Tuesday, June 21
  </div>

  <div class="cart-item-details-grid">
    <img class="product-image"
      src="${matchingProduct.image}">

    <div class="cart-item-details">
      <div class="product-name">
        ${matchingProduct.name}
      </div>
      <div class="product-price">
        $${formatMoney(matchingProduct.priceCents)}
      </div>
      <div class="product-quantity">
        <span>
          Quantity: <span class="quantity-label">${cartItem.quantity}</span>
        </span>
        <span class="update-quantity-link link-primary">
          Update
        </span>
        <span class="delete-quantity-link link-primary
        js-delete-link">
          Delete
        </span>
      </div>
    </div>

    <div class="delivery-options">
      <div class="delivery-options-title">
        Choose a delivery option:
      </div>
      <div class="delivery-option">
        <input type="radio" checked
          class="delivery-option-input"
          name="delivery-option-${productId}">
        <div>
          <div class="delivery-option-date">
            Tuesday, June 21
          </div>
          <div class="delivery-option-price">
            FREE Shipping
          </div>
        </div>
      </div>
      <div class="delivery-option">
        <input type="radio"
          class="delivery-option-input"
          name="delivery-option-${productId}">
        <div>
          <div class="delivery-option-date">
            Wednesday, June 15
          </div>
          <div class="delivery-option-price">
            $4.99 - Shipping
          </div>
        </div>
      </div>
      <div class="delivery-option">
        <input type="radio"
          class="delivery-option-input"
          name="delivery-option-${productId}">
        <div>
          <div class="delivery-option-date">
            Monday, June 13
          </div>
          <div class="delivery-option-price">
            $9.99 - Shipping
          </div>
        </div>
      </div>
    </div>
  </div>
  </div>
  `;
});

document.querySelector('.js-cart-summary').innerHTML = cartSummaryHTML;

let deleteButtons = document.querySelectorAll('.js-delete-link');

deleteButtons.forEach((button) => {
  button.addEventListener('click', (event) => {
    
    let quantityLabel = button.parentElement.querySelector('.quantity-label');
    let quantity = parseInt(quantityLabel.textContent);

    if (quantity > 1) {
      quantityLabel.textContent = quantity - 1;
    }
    else if (quantity === 1) {
      // Traverse up the DOM tree to the closest 'product' div and remove that
      button.closest('.cart-item-container').remove();
    }
  });
});

// Update button
let updateButtons = document.querySelectorAll('.update-quantity-link');

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

        input.style.width = '50px'; 
        input.style.height = '20px';

        select.replaceWith(input);

        input.addEventListener('keydown', (event) => {
          if (event.key === 'Enter') { 
            event.preventDefault();
            quantityLabel.textContent = event.target.value;
            input.replaceWith(button);
          }
        });
      } else {
        quantityLabel.textContent = event.target.value;
        select.replaceWith(button);
      }
    });
  });
});