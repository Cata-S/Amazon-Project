import { cart as initialCart, initializeButtons } from "../data/cart.js";
import { products } from "../data/products.js";
import formatMoney from "../utils/money.js";
import OrderSummary from "./order-summary.js";
import dayjs from "https://unpkg.com/dayjs@1.11.10/esm/index.js";

document.addEventListener("DOMContentLoaded", (event) => {
  let cart = JSON.parse(localStorage.getItem("cart")) || initialCart;
  let today = dayjs();

  let cartSummaryHTML = "";

  cart.forEach((cartItem) => {
    const productId = cartItem.productId;
    let matchingProduct = products.find((product) => product.id === productId);

    if (matchingProduct) {
      cartSummaryHTML += `
      <div class="cart-item-container" data-product-id="${productId}">
    <div class="delivery-date js-delivery-date">
      Delivery date: Monday, June 7
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
          <span class="update-quantity-link link-primary "">
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
            name="delivery-option-${productId}"
            value="7">
          <div>
            <div class="delivery-option-date">
            ${today.add(7, "days").format("dddd, MMMM D")}
            </div>
            <div class="delivery-option-price">
              FREE Shipping
            </div>
          </div>
        </div>
        <div class="delivery-option">
          <input type="radio"
            class="delivery-option-input"
            name="delivery-option-${productId}"
            value="3">
          <div>
            <div class="delivery-option-date">
            ${today.add(3, "days").format("dddd, MMMM D")}
            </div>
            <div class="delivery-option-price">
              $4.99 - Shipping
            </div>
          </div>
        </div>
        <div class="delivery-option">
          <input type="radio"
            class="delivery-option-input"
            name="delivery-option-${productId}"
            value="1">
          <div>
            <div class="delivery-option-date">
            ${today.add(1, "days").format("dddd, MMMM D")}
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
    }
  });

  document.querySelector(".js-cart-summary").innerHTML = cartSummaryHTML;

  document.querySelectorAll('input[name^="delivery-option"]').forEach((radioButton) => {
    radioButton.addEventListener('change', (event) => {
      if (radioButton.checked) {
        const daysToAdd = parseInt(radioButton.value, 10);
        const deliveryDate = dayjs().add(daysToAdd, "days").format("dddd, MMMM D");
        const deliveryDateElement = radioButton.closest('.cart-item-container').querySelector('.js-delivery-date');
        deliveryDateElement.textContent = `Delivery date: ${deliveryDate}`;
      }
    });
    if (radioButton.checked) {
      radioButton.dispatchEvent(new Event('change'));
    }
  });

  initializeButtons();

  OrderSummary.generateOrderSummary(cart);

  //Checkout Count
  let cartQuantity = -1;
  cart.forEach((cartItem) => {
    cartQuantity += cartItem.quantity;
  });

  document.querySelector(
    ".js-items-count"
  ).textContent = `${cartQuantity} Items`;
});