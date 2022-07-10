const orderId = JSON.parse(localStorage.getItem("orderId").split("-").join(''));
console.log(orderId);

const displayOrderId = document.getElementById("orderId");

displayOrderId.textContent = `${orderId}`

