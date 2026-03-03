const params = new URLSearchParams(window.location.search);
const id = params.get("id");

fetch(`https://kea-alt-del.dk/t7/api/products/${id}`)
  .then((response) => response.json())
  .then((product) => {
    let soldOutClass = product.soldout ? "udsolgt" : "";

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

    productContainer.innerHTML = `  <div class="product_images">
        <img src="https://kea-alt-del.dk/t7/images/webp/640/${id}.webp" alt="" />
      </div>

      <div class="product_info">
        <h2>${product.productdisplayname}</h2>
   
     

        <p><strong>Type:</strong>${product.articletype}</p>
        <p><strong>Størrelse:</strong>${product.sizefitdesc}</p>
        <p><strong>Sæson:</strong>${product.season}</p>
     ${discountHTML}
        ${soldOutClass}
     
        <button>Køb nu</button>
      </div>`;
  });

const productContainer = document.querySelector(".product_container");
