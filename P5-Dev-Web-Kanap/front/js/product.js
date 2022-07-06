const product = window.location.search.split("?").join("");
// console.log(product);

let productData = [];

const fetchProduct = async () => {
  await fetch(`http://localhost:3000/api/products/${product}`)
    .then((res) => res.json())
    .then((promise) => {
      productData = promise;
    });
};

// -------------------------Affichage du produit----------------------

const productDisplay = async () => {
  await fetchProduct();

  document.querySelector(
    "div.item__img"
  ).innerHTML = `<img src="${productData.imageUrl}" alt="${productData.altTxt}"/>`;

  document.getElementById("title").textContent = `${productData.name}`;

  document.getElementById(
    "description"
  ).textContent = `${productData.description}`;

  document.getElementById("price").textContent = `${productData.price}`;

  document.getElementById("addToCart").setAttribute("id", `${productData._id}`);

  let selectColor = document.getElementById("colors");

  productData.colors.forEach((color) => {
    let optionValue = document.createElement("option");
    //  console.log(optionValue);

    optionValue.innerHTML = `${color}`;
    optionValue.value = `${color}`;

    selectColor.appendChild(optionValue);
  });

  addCart(productData);
};

productDisplay();


// -------------------------Ajout produit dans le panier----------------------

const addCart = () => {
  let button = document.getElementById(productData._id);
  
  button.addEventListener("click", () => {
    let productArray = JSON.parse(localStorage.getItem("product"));
    let color = document.getElementById("colors");
    let quantity = document.getElementById("quantity");
    // let totalPrice = document.getElementById("price");
    console.log(quantity.value);
    console.log(button);
    

    const fusionProductcolor = Object.assign({}, productData, {
      color: `${color.value}`,
      quantite: `${quantity.value}`,
      totalPrice: `${eval(quantity.value * productData.price)}`
    });


    if (color.value == "" || quantity.value == "0") {
      alert("Veuillez choisir un coloris et saisir une quantité");
    } else {
      if (productArray == null) {
        productArray = [];
        productArray.push(fusionProductcolor);
        console.log(productArray);
        localStorage.setItem("product", JSON.stringify(productArray));
      } else if (productArray != null) {
        for (i = 0; i < productArray.length; i++) {
          if (
            productArray[i]._id == productData._id &&
            productArray[i].color == color.value
          ) {
            return (
              (productArray[i].quantite =
                Number(productArray[i].quantite) + Number(quantity.value)),
              // productArray[i].price = productArray[i].price * Number(quantity.value),
              localStorage.setItem("product", JSON.stringify(productArray)),
              (productArray = JSON.parse(localStorage.getItem("product")))
            );
          }
        }
        for (i = 0; i < productArray.length; i++) {
          if (
            (productArray[i]._id == productData._id &&
              productArray[i].color != color.value) ||
            productArray[i]._id != productData._i
          ) {
            return (
              productArray.push(fusionProductcolor),
              localStorage.setItem("product", JSON.stringify(productArray)),
              (productArray = JSON.parse(localStorage.getItem("product"))),
              console.log(productArray)
            );
          }
        }
      }
    }
  });

  return (productArray = JSON.parse(localStorage.getItem("product")));
};



















// const buttonValidation = document.getElementById("addToCart");
// buttonValidation.addEventListener("click", () => {
//   window.location = "./cart.html";
// });
