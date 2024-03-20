export let cart = JSON.parse(localStorage.getItem("cart")) || [];

export function addToCart(productId, quantity) {
  if (quantity > 0) {
    let matchingItem = cart.find(
      (cartItem) => cartItem.productId === productId
    );

    if (matchingItem) {
      matchingItem.quantity += quantity;
    } else {
      cart.push({ productId: productId, quantity: quantity });
    }
  }
}

export function removeFromCart(productId) {
  let matchingItemIndex = cart.findIndex(
    (cartItem) => cartItem.productId === productId
  );

  if (matchingItemIndex !== -1) {
    cart.splice(matchingItemIndex, 1);
  }
}
// Buttons
export function initializeButtons(updateOrderSummaryCallback, updateCheckoutCountCallback) {
  let deleteButtons = document.querySelectorAll(".js-delete-link");
  let updateButtons = document.querySelectorAll(".update-quantity-link");

  deleteButtons.forEach((button) => {
    button.classList.add("no-select");
    button.addEventListener("click", (event) => {
      let quantityLabel = button.parentElement.querySelector(".quantity-label");
      let quantity = parseInt(quantityLabel.textContent);

      if (quantity > 1) {
        quantityLabel.textContent = quantity - 1;
        let productId = button.closest(".cart-item-container").dataset
          .productId;
        let cartItem = cart.find((item) => item.productId === productId);
        cartItem.quantity -= 1;
        localStorage.setItem("cart", JSON.stringify(cart));
      } else if (quantity === 1) {
        let productId = button.closest(".cart-item-container").dataset
          .productId;
        removeFromCart(productId);
        localStorage.setItem("cart", JSON.stringify(cart));
        location.reload();
        button.closest(".cart-item-container").remove();
      }
      updateOrderSummaryCallback(cart);
      updateCheckoutCountCallback(cart);
    });
  });
  updateButtons.forEach((button) => {
    button.addEventListener("click", (event) => {
      let productId = button.closest(".cart-item-container").dataset.productId; // Store productId here
      let select = document.createElement("select");
      for (let i = 1; i <= 9; i++) {
        let option = document.createElement("option");
        option.value = i;
        option.text = i;
        select.appendChild(option);
      }
      let option = document.createElement("option");
      option.value = "10+";
      option.text = "10+";
      select.appendChild(option);
      button.replaceWith(select);

      select.addEventListener("change", (event) => {
        let quantityLabel =
          select.parentElement.querySelector(".quantity-label");
        if (event.target.value === "10+") {
          let input = document.createElement("input");
          input.type = "number";
          input.min = "1";
          input.size = "2";
          input.maxLength = "2";
          input.style.width = "40px";
          select.replaceWith(input);

          input.addEventListener("blur", (event) => {
            let cartItem = cart.find((item) => item.productId === productId); 
            cartItem.quantity = parseInt(event.target.value);
            quantityLabel.textContent = event.target.value;
            input.replaceWith(button);
            localStorage.setItem("cart", JSON.stringify(cart));
            updateOrderSummaryCallback(cart);
          updateCheckoutCountCallback(cart);
          });

          input.addEventListener("keypress", function (e) {
            if (e.key === "Enter") {
              let cartItem = cart.find((item) => item.productId === productId); 
              cartItem.quantity = parseInt(e.target.value);
              quantityLabel.textContent = e.target.value;
              input.replaceWith(button);
              localStorage.setItem("cart", JSON.stringify(cart));
              updateOrderSummaryCallback(cart);
              updateCheckoutCountCallback(cart);
            }
          });
        } else {
          let cartItem = cart.find((item) => item.productId === productId); // Use stored productId
          cartItem.quantity = parseInt(event.target.value);
          quantityLabel.textContent = event.target.value;
          select.replaceWith(button);
          localStorage.setItem("cart", JSON.stringify(cart));
          updateOrderSummaryCallback(cart);
          updateCheckoutCountCallback(cart);
        }
      });
    });
  });
  document.querySelectorAll(".update-quantity-link").forEach((link) => {
    link.addEventListener("click", () => {
      updateOrderSummary(cart, 0.1);
    });
  });
}
