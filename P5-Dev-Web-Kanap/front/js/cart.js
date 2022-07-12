// -------------------------Affichage des produits dans le panier----------------------

let addProduct = JSON.parse(localStorage.getItem("product"));


const productCartDisplay = async () => {
  if (addProduct) {
    await addProduct;

    document.getElementById("cart__items").innerHTML = addProduct
      .map(
        (product) => `
      <article class="cart__item" data-id=${product._id} data-color="{product-color}">
      <div class="cart__item__img">
      <img src="${product.imageUrl}" alt="${product.altTxt}"/>
      </div>
      <div class="cart__item__content">
      <div class="cart__item__content__description">
      <h2>${product.name}</h2>
      <p>${product.color}</p>
      <p>${product.price}€</p>
      </div>
      <div class="cart__item__content__settings">
      <div class="cart__item__content__settings__quantity">
      <p>Qté :</p>
      <input type="number" class="itemQuantity" data-color="${product.color}" data-id="${product._id}" name="itemQuantity" min="1" max="100" value="${product.quantite}">
      </div>
      <div class="cart__item__content__settings__delete">
      <p class="deleteItem" data-color="${product.color}" data-id="${product._id}">Supprimer</p>
      </div>
      </div>
      </div>
      </article>`
      )
      .join("");
    deleteProduct();
    newQuantite();

    return;
  } else {
    document.getElementById("order").addEventListener("click", () => {
      alert("Ajouter des produits à votre panier pour continuer");
    });
  }
};
productCartDisplay();


// -------------------------Supprimer produit depuis panier----------------------
let sommeProduct = [];


const deleteProduct = async (productCartDisplay) => {
  await productCartDisplay;

  let corbeilles = document.querySelectorAll(".deleteItem");
  corbeilles.forEach((corbeille) => {
    corbeille.addEventListener("click", () => {
      window.location.reload(true);

      let totalDeletes = addProduct.length;
      console.log(totalDeletes);

      if (totalDeletes == 1) {
        return localStorage.removeItem("product"), console.log("tgb");
      } else {
        sommeProduct = addProduct.filter((e) => {
          if (
            corbeille.dataset.id != e._id ||
            corbeille.dataset.color != e.color
          ) {
            return true;
          }
        });
        console.log(sommeProduct);
        localStorage.setItem("product", JSON.stringify(sommeProduct));
        JSON.parse(localStorage.getItem("product"));
      }
    });
  });
};

// -------------------------Ajout produit depuis panier----------------------

const newQuantite = async (productCartDisplay) => {
  await productCartDisplay;

  let modifQuantite = document.querySelectorAll("input.itemQuantity");
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
          
            total()
          );
      }
    });
  });
};

// -------------------------Total produit et prix total----------------------

const total = () => {
  // let dataLocal = JSON.parse(localStorage.getItem("product"));

  productQuantity = [];
  productPrice = [];

  if (addProduct) {
    addProduct.forEach((product) => {
      productQuantity.push(product.quantite);
      productPrice.push(product.totalPrice);

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

// -------------------------Formulaire----------------------

const firstName = document.getElementById("firstName");
const lastName = document.getElementById("lastName");
const address = document.getElementById("address");
const city = document.getElementById("city");
const email = document.getElementById("email");

let valueFirstName;
let valueLastName;
let valueAddress;
let valueCity;
let valueEmail;

// ------------------------RegeExp input firstname-----------------

firstName.addEventListener("input", function (e) {
  valueFirstName;
  if (e.target.value.length == 0) {
    firstNameErrorMsg.innerHTML = "";
    valueFirstName = null;
  } else if (e.target.value.length < 2 || e.target.value.length > 20) {
    firstNameErrorMsg.innerHTML =
      "Veuillez saisir un prénom entre 2 et 20 caractéres";
    firstNameErrorMsg.style.color = "red";
    valueFirstName = null;
  }

  if (e.target.value.match(/^[a-z A-Z]{2,20}$/)) {
    firstNameErrorMsg.innerHTML = "";
    valueFirstName = e.target.value;
  }

  if (
    !e.target.value.match(/^[a-z A-Z]{2,20}$/) &&
    e.target.value.length > 2 &&
    e.target.value.length < 20
  ) {
    firstNameErrorMsg.innerHTML =
      "Veuillez ne pas saisir de caractères spéciaux, de chiffres ou accents";
      firstNameErrorMsg.style.color = "red";
    valueFirstName = null;
  }
});

// ------------------------RegeExp input lastname-----------------

lastName.addEventListener("input", function (e) {
  valueLastName;
  if (e.target.value.length == 0) {
    lastNameErrorMsg.innerHTML = "";
    valueLastName = null;
  } else if (e.target.value.length < 2 || e.target.value.length > 20) {
    lastNameErrorMsg.innerHTML =
      "Veuillez saisir un nom entre 2 et 20 caractéres";
    lastNameErrorMsg.style.color = "red";
    valueLastName = null;
  }

  if (e.target.value.match(/^[a-z A-Z]{2,20}$/)) {
    lastNameErrorMsg.innerHTML = "";
    valueLastName = e.target.value;
  }

  if (
    !e.target.value.match(/^[a-z A-Z]{2,20}$/) &&
    e.target.value.length > 2 &&
    e.target.value.length < 20
  ) {
    lastNameErrorMsg.innerHTML =
      "Veuillez ne pas saisir de caractères spéciaux, de chiffres ou accents";
      firstNameErrorMsg.style.color = "red";
    valueLastName = null;
  }
});

// ------------------------RegeExp input address-----------------

address.addEventListener("input", function (e) {
  valueAddress;
  if (e.target.value.length == 0) {
    addressErrorMsg.innerHTML = "";
    valueAddress = null;
  } else if (e.target.value.length < 2 || e.target.value.length > 35) {
    addressErrorMsg.innerHTML =
      "Veuillez saisir une adresse entre 2 et 35 caractéres";
    addressErrorMsg.style.color = "red";
    valueAddress = null;
  }

  if (e.target.value.match(/^[0-9]{1,4} [a-z A-Z]{2,35}$/)) {
    addressErrorMsg.innerHTML = "";
    valueAddress = e.target.value;
  }

  if (
    !e.target.value.match(/^[0-9]{1,4} [a-z A-Z]{2,35}$/) &&
    e.target.value.length > 2 &&
    e.target.value.length < 35
  ) {
    addressErrorMsg.innerHTML =
      "Veuillez commencer par un chiffre et ne pas saisir de caractères spéciaux ni accents";
    valueAddress = null;
  }
});

// ------------------------RegeExp input city-----------------

city.addEventListener("input", function (e) {
  valueCity;
  if (e.target.value.length == 0) {
    cityErrorMsg.innerHTML = "";
    valueCity = null;
  } else if (e.target.value.length < 2 || e.target.value.length > 20) {
    cityErrorMsg.innerHTML =
      "Veuillez saisir une ville entre 2 et 20 caractéres";
    cityErrorMsg.style.color = "red";
    valueCity = null;
  }

  if (e.target.value.match(/^([a-z A-Z]{2,20})?([-])([a-z A-Z]{2,20})$/)) {
    cityErrorMsg.innerHTML = "";
    valueCity = e.target.value;
  }

  if (
    !e.target.value.match(/^([a-z A-Z]{2,20})?([-])([a-z A-Z]{2,20})$/) &&
    e.target.value.length > 2 &&
    e.target.value.length < 20
  ) {
    cityErrorMsg.innerHTML =
      "Veuillez ne pas saisir de caractères spéciaux, de chiffres ou accents";
    valueCity = null;
  }
});

// ------------------------RegeExp input email-----------------

email.addEventListener("input", function (e) {
  valueEmail;
  if (e.target.value.length == 0) {
    emailErrorMsg.innerHTML = "";
    valueEmail = null;
  } else if (
    e.target.value.match(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/) 
  ) {
    emailErrorMsg.innerHTML = "";
    valueEmail = e.target.value;
  }

  if (
    !e.target.value.match(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/) &&
    !e.target.value.length == 0
  ) {
    emailErrorMsg.innerHTML = "Email incorrect ex: nom.prenom@gmail.fr";
  }
});

// ------------------------validation commande-----------------

const validationCart = document.addEventListener("submit", (e) => {
  e.preventDefault();

  if (
    addProduct &&
    valueFirstName &&
    valueLastName &&
    valueAddress &&
    valueCity &&
    valueEmail
  ) {
    const orderTotal = JSON.parse(localStorage.getItem("product"));
    let orderId = [];

    orderTotal.forEach((order) => {
      orderId.push(order._id);
    });

    const dataUser = {
      contact: {
        firstName: valueFirstName,
        lastName: valueLastName,
        address: valueAddress,
        city: valueCity,
        email: valueEmail,
      },

      products: orderId,
    };
    localStorage.setItem("order", JSON.stringify(dataUser));


    // ------------------------envoi vers server-----------------

    const promise1 = fetch("http://localhost:3000/api/products/order", {
      method: "POST",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(dataUser),
    });

    
    // ------------------------réponse du server-----------------


    promise1.then(async(response) => {
      try {
        const content = await response.json();
    
        const finalOrder = content.orderId;
        
        window.location = `confirmation.html?${finalOrder}`
      
      } catch {
        
        alert("Nous rencontrons un problème avec votre commande");
      }
    });
    
  } else {
    alert("Aucune commande validée");
  }
});
