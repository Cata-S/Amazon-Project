import { cart, addToCart, removeFromCart } from "../data/cart.js";
import { products } from "../data/products.js";
import { formatMoney } from "../utils/money.js";

let myCart = JSON.parse(localStorage.getItem("cart")) || initialCart;

let productsHTML = "";

products.forEach((product) => {
  productsHTML += `
     <div class="product-container">
      <div class="product-image-container">
        <img class="product-image"
          src="${product.image}">
      </div>

      <div class="product-name limit-text-to-2-lines">
        ${product.name}
      </div>

      <div class="product-rating-container">
        <img class="product-rating-stars"
          src="images/ratings/rating-${product.rating.stars * 10}.png">
        <div class="product-rating-count link-primary">
          ${product.rating.count}
        </div>
      </div>

      <div class="product-price">
        $${formatMoney(product.priceCents)}
      </div>

      <div class="product-quantity-container">
        <select class ="js-product-quantity">
          <option selected value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
          <option value="6">6</option>
          <option value="7">7</option>
          <option value="8">8</option>
          <option value="9">9</option>
          <option value="10">10</option>
        </select>
      </div>

      <div class="product-spacer"></div>

      <div class="added-to-cart">
        <img src="images/icons/checkmark.png">
        Added
      </div>

      <button class="add-to-cart-button button-primary 
      js-add-to-cart"
      data-product-id="${product.id}">
        Add to Cart
      </button>
    </div>
  `;
});

document.querySelector(".js-products-grid").innerHTML = productsHTML;

// Update cart quantity
function updateCartQuantity() {
  let cartQuantity = -1;

  if (myCart.length > 0) {
    myCart.forEach((cartItem) => {
      cartQuantity += cartItem.quantity;
    });
  }

  document.querySelector(".js-cart-quantity").innerHTML = cartQuantity;
}

updateCartQuantity();

document.querySelectorAll(".js-add-to-cart").forEach((button) => {
  button.addEventListener("click", () => {
    const productId = button.dataset.productId;
    const quantity = parseInt(
      button.parentElement.querySelector(".js-product-quantity").value
    );

    addToCart(productId, quantity); // Use the imported addToCart function
    updateCartQuantity(); // Update cart quantity when an item is added to the cart

    localStorage.setItem("cart", JSON.stringify(cart)); // Update localStorage with the current state of the cart
    location.reload(); // Reload the page to reflect the changes on the checkout page
  });
});
