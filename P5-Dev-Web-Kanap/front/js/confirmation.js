
// -------------------------Récupération de l'id de la commande----------------------

const finalOrder = window.location.search.split("?").join("");

// -------------------------Affichage de l'id de la commande----------------------

displayOrderId = document.getElementById(
  "orderId"
).textContent = `${finalOrder}`;

// -------------------------Suppression des données dans le localstorage----------------------

// const deleteLocalstorage = () => {
//   localStorage.removeItem("product");
//   
// };


