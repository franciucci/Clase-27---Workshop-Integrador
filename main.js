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
  new Products("Vans", 4500, 0),
  new Products("Adidas", 6500, 0),
  new Products("DC", 5000, 0),
];
// AGREGA PRODUCTOS AL CARRITO
onLoadItemsInCart();
const btnAddToCart = document.getElementsByClassName("btn-addcart");
console.log(btnAddToCart); // checkeo que este tomando bien los elementos
for (let i = 0; i < btnAddToCart.length; i++) {
  let buttonAdd = btnAddToCart[i];
  buttonAdd.addEventListener("click", () => {
    itemsInCart(cartArray[i]);
    totalCost(cartArray[i]);
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
// FUNCIÓN PARA GUARDAR LOS ITEMS AGREGADOS AL LOCALSTORAGE
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
