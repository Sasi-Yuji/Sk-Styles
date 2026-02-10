document.addEventListener("DOMContentLoaded", function () {
  const categoryItems = document.querySelectorAll(".ds");
  const products = document.querySelectorAll(".cart1");

  categoryItems.forEach(item => {
    item.addEventListener("click", function () {
      const selectCategory = this.getAttribute("data-category");

      products.forEach(product => {
        const productCategory = product.getAttribute("data-category");

        if (selectCategory === "all") {
          product.style.display = "block";
        } else {
          product.style.display = productCategory === selectCategory ? "block" : "none";
        }
      });
    });
  });
});

const searchBar = document.getElementById("searchBar");

searchBar.addEventListener("input", function () {
  const query = this.value.toLowerCase().trim();
  const products = document.querySelectorAll(".cart1");

  products.forEach(product => {
    const productName = product.querySelector("p").textContent.toLowerCase();

    if (productName.includes(query)) {
      product.style.display = "block";
    } else {
      product.style.display = "none";
    }
  });
});

document.addEventListener("DOMContentLoaded", function () {
  const buttons = document.querySelectorAll(".bt");
  const cartItemsContainer = document.querySelector(".cart-items");

  let cart = [];

  buttons.forEach(button => {
    button.addEventListener("click", function () {
      const product = this.closest(".cart1");
      const name = product.querySelector("p").textContent.trim();
      const price = parseFloat(product.getAttribute("data-price"));
      const image = product.querySelector("img").getAttribute("src");

      const existing = cart.find(item => item.name === name);
      if (existing) {
        existing.qty++;
      } else {
        cart.push({ name, price, qty: 1, image });
      }

      updateCart();
    });
  });

  function updateCart() {
    let total = 0;

    const checkoutContainer = document.getElementById("checkoutContainer");
    checkoutContainer.innerHTML = "";

    cart.forEach(item => {
      const div = document.createElement("div");
      div.classList.add("cart-entry");

      div.innerHTML = `
        <div class="cart-item-row">
          <img src="${item.image}" alt="${item.name}" class="cart-image">
          <div>
            <p><b>${item.name}</b></p>
            <p>${item.qty} × $${item.price} = $${(item.qty * item.price).toFixed(2)}</p>
          </div>
        </div>
        <hr>
      `;

      checkoutContainer.appendChild(div);
      total += item.qty * item.price;
    });

    const totalDiv = document.createElement("div");
    totalDiv.classList.add("cart-entry");
    totalDiv.innerHTML = `<h3>Total: $${total.toFixed(2)}</h3>`;
    checkoutContainer.appendChild(totalDiv);

    const checkoutBtn = document.createElement("button");
    checkoutBtn.className = "checkout-btn";
    checkoutBtn.textContent = "Proceed to Checkout";
    checkoutBtn.addEventListener("click", function () {
      alert("Thanks for your purchase!");
    });

    checkoutContainer.appendChild(checkoutBtn);
  }
});
