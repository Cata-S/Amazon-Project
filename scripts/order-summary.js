// order-summary.js code
import { products } from '../data/products.js';

function calculateTotal(cart) {
  let total = 0;
  cart.forEach((cartItem) => {
    let matchingProduct = products.find(product => product.id === cartItem.productId); 
    if (matchingProduct) {
      total += matchingProduct.priceCents * cartItem.quantity;
    }
  });
  return total;
}

function calculateShipping() {
  let shippingCost = 0;
  let shippingInputs = document.querySelectorAll('.delivery-option-input');
  shippingInputs.forEach((input) => {
    if (input.checked) {
      let priceText = input.nextElementSibling.querySelector('.delivery-option-price').textContent;
      let match = priceText.match(/\$([0-9\.]+)/);
      if (match) {
        shippingCost = parseFloat(match[1]);
      } else if (priceText.includes('FREE')) {
        shippingCost = 0;
      }
    }
  });
  return shippingCost;
}
function calculateTax(total, taxRate) {
  return total * taxRate;
}

function updateOrderSummary(cart, taxRate) {
  let total = calculateTotal(cart);
  let shipping = calculateShipping();
  let tax = calculateTax(total, taxRate);
  let grandTotal = total + shipping + tax;
  document.querySelector('.js-order-total').textContent = `$${grandTotal.toFixed(2)}`;
}
function generateOrderSummary(cart) {
  let total = calculateTotal(cart);
  let shipping = calculateShipping();
  let tax = total * 0.1; 

  let summaryHTML = `
<div class="payment-summary">
  <div class="payment-summary-title">
    Order Summary
  </div>

  <div class="payment-summary-row">
    <div>Items (${cart.length - 1}):</div>
    <div class="payment-summary-money">$${(total / 100).toFixed(2)}</div>
  </div>

  <div class="payment-summary-row">
    <div>Shipping &amp; handling:</div>
    <div class="payment-summary-money">$${(shipping / 100).toFixed(2)}</div>
  </div>

  <div class="payment-summary-row subtotal-row">
    <div>Total before tax:</div>
    <div class="payment-summary-money">$${((total + shipping) / 100).toFixed(2)}</div>
  </div>

  <div class="payment-summary-row">
    <div>Estimated tax (10%):</div>
    <div class="payment-summary-money">$${(tax / 100).toFixed(2)}</div>
  </div>

  <div class="payment-summary-row total-row">
    <div>Order total:</div>
    <div class="payment-summary-money">$${((total + shipping + tax) / 100).toFixed(2)}</div>
  </div>

  <button class="place-order-button button-primary">
    Place your order
  </button>
</div>
`;

document.querySelector('.js-order-summary').innerHTML = summaryHTML;
}

const OrderSummary = {
  calculateTotal,
  calculateShipping,
  calculateTax,
  updateOrderSummary,
  generateOrderSummary
};

export default OrderSummary;






