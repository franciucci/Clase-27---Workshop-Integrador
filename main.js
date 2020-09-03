// CREA UNA CLASE PARA LOS PRODUCTOS
class Products {
  constructor(name, price, inCart) {
    this.name = name;
    this.price = price;
    this.inCart = inCart;
  }
}
//ARRAY CON TODOS LOS PRODUCTOS
let cartArray = [
  new Products("Zapatillas Vans", 4500, 0),
  new Products("Zapatillas Adidas", 6500, 0),
  new Products("Zapatillas DC", 5000, 0),
];
// AGREGA PRODUCTOS AL CARRITO
onLoadItemsInCart(); /* Actualiza el carrito al cargar la página */
displayCart(); /* Si está en la página de carrito muestra los productos */
const btnAddToCart = document.getElementsByClassName("btn-addcart");
for (let i = 0; i < btnAddToCart.length; i++) {
  let buttonAdd = btnAddToCart[i];
  buttonAdd.addEventListener("click", () => {
    itemsInCart(cartArray[i]);
    totalCost(cartArray[i]);
    buttonAdd.style.outline = "none";
  });
}

// FUNCIÓN PARA AGREGAR ITEMS AL CARRITO
function itemsInCart(products) {
  let itemsInCart = localStorage.getItem("itemsInCart");
  itemsInCart = parseInt(itemsInCart);
  if (itemsInCart) {
    localStorage.setItem("itemsInCart", itemsInCart + 1);
    document.getElementById("cart-logo").textContent =
      "(" + (itemsInCart + 1) + ")";
  } else {
    localStorage.setItem("itemsInCart", 1);
    document.getElementById("cart-logo").textContent = "(" + 1 + ")";
  }
  setItems(products);
}

// FUNCIÓN PARA GUARDAR LOS DATOS DEL PRODUCTO EN LOCAL STORAGE
function setItems(product) {
  let productsCart = localStorage.getItem("productsInCart");
  productsCart = JSON.parse(productsCart);
  if (productsCart != null) {
    if (productsCart[product.name] == undefined) {
      productsCart = {
        ...productsCart,
        [product.name]: product,
      };
    }
    productsCart[product.name].inCart += 1;
  } else {
    product.inCart = 1;
    productsCart = { [product.name]: product };
  }

  localStorage.setItem("productsInCart", JSON.stringify(productsCart));
}
// FUNCIÓN PARA MOSTRAR LA CANT. DE ITEMS EN EL CARRITO
function onLoadItemsInCart() {
  let itemsInCart = localStorage.getItem("itemsInCart");
  if (itemsInCart) {
    document.getElementById("cart-logo").textContent = "(" + itemsInCart + ")";
  }
}
// FUNCIÓN PARA CALCULAR EL COSTO TOTAL DEL CARRITO
function totalCost(product) {
  let cartCost = localStorage.getItem("totalCost");
  if (cartCost != null) {
    cartCost = parseFloat(cartCost);
    localStorage.setItem("totalCost", cartCost + product.price);
  } else {
    localStorage.setItem("totalCost", product.price);
  }
}
// FUNCIÓN QUE MUESTRA LOS PRODUCTOS DEL CARRITO
function displayCart() {
  let cartCost = localStorage.getItem("totalCost");
  let cartProducts = localStorage.getItem("productsInCart");
  cartProducts = JSON.parse(cartProducts);
  let shoppingCart = document.getElementById("products");
  if (cartProducts && shoppingCart) {
    shoppingCart.innerHTML = "";
    Object.values(cartProducts).map((item) => {
      shoppingCart.innerHTML += `
      <div class="product">
        <div class="product-container">
          <i class="fas fa-times"></i>
          <img src="./assets/${item.name}.png">
          <p class="product-name">${item.name}</p>
        </div>
        <div class="price">$${item.price},00</div>
        <div class="quantity">
          <i class="fas fa-plus-circle"></i>
          <span>${item.inCart}</span>
          <i class="fas fa-minus-circle"></i>
        </div> 
        <div class="total">
          $${item.inCart * item.price},00
        </div>
      </div>
      `;
    });

    shoppingCart.innerHTML += `
    <div class="basketTotalContainer">
      <h4 class="basketTotalTitle">Compra Total</h4>
      <h4 class="basketTotal">$${cartCost},00</h4>
    </div>
    `;
  }
}
