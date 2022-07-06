let addProduct = JSON.parse(localStorage.getItem("product"));
console.log(addProduct);

const productCartDisplay = async () => {
  if (addProduct) {
    await addProduct;

    document.getElementById("cart__items").innerHTML = addProduct
      .map(
        (product) => `
      <article class="cart__item" data-id=${
        product._id
      } data-color="{product-color}">
      <div class="cart__item__img">
      <img src="${product.imageUrl}" alt="${product.altTxt}"/>
      </div>
      <div class="cart__item__content">
      <div class="cart__item__content__description">
      <h2>${product.name}</h2>
      <p>${product.color}</p>
      <p id="total_price">${product.price * product.quantite}€</p>
      </div>
      <div class="cart__item__content__settings">
      <div class="cart__item__content__settings__quantity">
      <p>Qté :</p>
      <input type="number" class="itemQuantity" data-color="${
        product.color
      }" data-id="${
          product._id
        }" name="itemQuantity" min="1" max="100" value="${product.quantite}">
      </div>
      <div class="cart__item__content__settings__delete">
      <p class="deleteItem">Supprimer</p>
      </div>
      </div>
      </div>
      </article>`
      )
      .join("");

    newQuantite();

    return;
  } else {
    document.getElementById("order").addEventListener("click", () => {
      alert("Ajouter des produits à votre panier pour continuer");
    });
  }
};
productCartDisplay();

// -------------------------Ajout produit depuis panier----------------------

// let plus = [];
const newQuantite = async (productCartDisplay) => {
  await productCartDisplay;

  let modifQuantite = document.querySelectorAll("input.itemQuantity");
  console.log(modifQuantite);
  total();
  modifQuantite.forEach((plusMoins) => {
    plusMoins.addEventListener("click", () => {
      console.log(plusMoins);

      for (i = 0; i < addProduct.length; i++) {
        if (
          addProduct[i]._id == plusMoins.dataset.id &&
          addProduct[i].color == plusMoins.dataset.color
        )
          return (
            (addProduct[i].quantite = plusMoins.value),
            (addProduct[i].totalPrice = plusMoins.value * addProduct[i].price),
            localStorage.setItem("product", JSON.stringify(addProduct)),
            JSON.parse(localStorage.getItem("product")),
            console.log(addProduct),
            total()
          );
      }
    });
  });
};

// -------------------------Total produit et prix total----------------------

const total = () => {
  let dataLocal = JSON.parse(localStorage.getItem("product"));

  productQuantity = [];
  productPrice = [];
  console.log(dataLocal);

  if (dataLocal) {
    dataLocal.forEach((product) => {
      productQuantity.push(product.quantite);
      productPrice.push(product.totalPrice);
      // console.log(productQuantity);
      // console.log(productPrice);

      document.getElementById("totalQuantity").textContent = `${eval(
        productQuantity.join("+")
      )}`;
      document.getElementById("totalPrice").textContent = `${eval(
        productPrice.join("+")
      )}`;
    });
  } else {
    document.getElementById("totalQuantity").textContent = 0;
  }
};
