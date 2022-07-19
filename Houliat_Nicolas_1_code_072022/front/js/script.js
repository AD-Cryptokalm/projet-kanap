// -------------------------Appel API----------------------
let productsData = [];

const fetchProducts = async () => {
  await fetch("http://localhost:3000/api/products/")
    .then((res) => res.json())
    .then((promise) => {
      productsData = promise;
    });
    console.log(productsData)
};
// -------------------------Affichage des produits----------------------
const productsDisplay = async () => {
  await fetchProducts();

// Créer une boucle por afficher tous les produits de la promise 
  document.getElementById("items").innerHTML = productsData
    .map(
      (product) => `
    <a href="./product.html?${product._id}">
    <article class="items" id=${product._id}>
    <img src="${product.imageUrl}" alt="${product.altTxt}"/>
    <h3>${product.name}</h3>
    <p>${product.description}</p>
    </article>
    </a>`
    )
    .join("");
};

productsDisplay();


