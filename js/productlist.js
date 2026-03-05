const productContainer = document.querySelector(".product_list_container");

const urlParams = new URLSearchParams(window.location.search);
const category = urlParams.get("category");

let url = "https://kea-alt-del.dk/t7/api/products";

if (category) {
  url = `https://kea-alt-del.dk/t7/api/products?category=${category}&limit=200`;
  document.querySelector("h1").textContent = category;
}

fetch(url)
  .then((response) => response.json())
  .then((data) => {
    productContainer.innerHTML = "";

    data.forEach((product) => {
      let soldOutClass = product.soldout ? "udsolgt" : "";

      let discountHTML = "";

      if (product.discount) {
        const newPrice = Math.ceil(
          product.price - (product.price * product.discount) / 100,
        );

        discountHTML = `
          <p class="old_price">${product.price} kr</p>
          <p class="discount">${newPrice} kr</p>
                    <p class="procent">-${product.discount}%</p>

        `;
      } else {
        discountHTML = `<p class="price">${product.price} kr</p>`;
      }

      productContainer.innerHTML += `
        <a href="produkt.html?id=${product.id}" 
           class="product_card ${soldOutClass}">
          <img src="https://kea-alt-del.dk/t7/images/webp/640/${product.id}.webp" 
               alt="${product.productdisplayname}">
          <h2>${product.productdisplayname}</h2>
          ${discountHTML}
        </a>
      `;
    });
  })
  .catch((error) => {
    productContainer.innerHTML = "<p>Der opstod en fejl.</p>";
    console.error(error);
  });
