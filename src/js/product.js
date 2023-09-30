import { setLocalStorage, getLocalStorage, getParam } from "./utils.mjs";
import productDetails from "./productDetails.mjs";
import { findProductById } from "./productData.mjs";


const productId = getParam('product');
productDetails(productId);
console.log(findProductById(productId));

if (!getLocalStorage("so-cart")) {
  setLocalStorage("so-cart", []);
}

function addProductToCart(product) {
  let cart = getLocalStorage("so-cart");

  if (!Array.isArray(cart)) {
    cart = [];
  }

  cart.push(product);

  setLocalStorage("so-cart", cart);
}
async function addToCartHandler(e) {
  e.preventDefault();
  const product = await findProductById(e.target.dataset.id);
  addProductToCart(product);
}

let cartButton = document.querySelector('.product-detail__add');
let cartIcon = document.querySelector('.cart');

function cartanimation(){
  
  cartIcon.classList.add('animation');
  settimeout(() =>{ cartIcon.classList.remove('animation');},
  "3");
  
}

document
  .getElementById("addToCart")
  .addEventListener("click", addToCartHandler);

  cartButton.addEventListener('click', cartanimation);

  


