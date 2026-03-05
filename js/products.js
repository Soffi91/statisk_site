const productContainer = document.querySelector(".product_container");

const params = new URLSearchParams(window.location.search);
const id = params.get("id");

fetch(`https://kea-alt-del.dk/t7/api/products/${id}`)
  .then((response) => response.json())
  .then((product) => {
    let soldOutClass = product.soldout ? "udsolgt" : "";

    let discountHTML = "";
    let discountLabel = "";

    if (product.discount) {
      const newPrice = Math.ceil(
        product.price - (product.price * product.discount) / 100,
      );

      discountHTML = `
        <p class="old_price">${product.price} kr</p>
        <p class="discount">${newPrice} kr</p>
      `;

      discountLabel = `<p class="procent">-${product.discount}%</p>`;
    } else {
      discountHTML = `<p class="price">${product.price} kr</p>`;
    }

    productContainer.innerHTML = `
      <div class="product_images">
        <img src="https://kea-alt-del.dk/t7/images/webp/640/${id}.webp" alt="${product.productdisplayname}" />
      </div>

      <div class="product_info ${soldOutClass}">
        <h2>${product.productdisplayname}</h2>

        ${discountLabel}
         <p><strong>Brand:</strong> ${product.brandname}</p>
        <p><strong>Type:</strong> ${product.articletype}</p>
       
        ${discountHTML}

        <button class="knap">Køb nu</button>
      </div>
    `;
  });
