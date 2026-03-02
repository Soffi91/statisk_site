const productContainer = document.querySelector(".product_list_container");

fetch("https://kea-alt-del.dk/t7/api/products")
  .then((response) => response.json())
  .then((data) => {
    data.forEach((product) => {
      // Tjek om produkt er udsolgt
      let soldOutClass = product.soldout ? "udsolgt" : "";

      // Tjek om produkt er nedsat
      let discountHTML = "";
      if (product.discount) {
        const newPrice = Math.round(
          product.price - (product.price * product.discount) / 100,
        );

        discountHTML = `
          <p class="old_price">${product.price} kr</p>
          <p class="discount">${newPrice} kr</p>
        `;
      } else {
        discountHTML = `<p class="price">${product.price} kr</p>`;
      }

      productContainer.innerHTML += `
        <a href="produkt.html?id=${product.id}" class="product_card ${soldOutClass}">
          <img src="https://kea-alt-del.dk/t7/images/webp/640/${product.id}.webp" alt="${product.productdisplayname}">
          <h2>${product.productdisplayname}</h2>
          ${discountHTML}
        </a>
      `;
    });
  });
