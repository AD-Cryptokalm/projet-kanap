let addProduct = JSON.parse(localStorage.getItem("product"));

const productCartDisplay = async () => {
  if (addProduct) {
    await addProduct;

    document.getElementById("cart__items").innerHTML = addProduct.map(
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
                    <p>${product.price * product.quantite}€</p>
                </div>
                <div class="cart__item__content__settings">
                    <div class="cart__item__content__settings__quantity">
                        <p>Qté :</p>
                        <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${
                          product.quantite
                        }">
                    </div>
                    <div class="cart__item__content__settings__delete">
                        <p class="deleteItem">Supprimer</p>
                    </div>
                </div>
            </div>
        </article>`
    ).join("");
  } else {
    document.getElementById("order").addEventListener("click", () => {
      alert("Ajouter des produits à votre panier pour continuer");
    });
  }
};
productCartDisplay();

// totaux

let dataLocal = JSON.parse(localStorage.getItem("product"));

productQuantity = [];
productPrice = [];
console.log(dataLocal)

if (dataLocal) {
    dataLocal.forEach((product) => {
        productQuantity.push(product.quantite);
        productPrice.push(product.totalPrice);
    console.log(productQuantity);
    console.log(productPrice);

    document.getElementById('totalQuantity').textContent = `${eval(productQuantity.join("+"))}`;
    document.getElementById('totalPrice').textContent = `${eval(productPrice.join("+"))}`;

});
}else{
    document.getElementById('totalQuantity').textContent = 0;
};

// -------------------------Ajout produit depuis panier----------------------


