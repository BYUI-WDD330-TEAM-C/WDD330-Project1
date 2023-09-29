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

  // Check if the product is already in the cart
  const existingProduct = cart.find((item) => item.Id === product.Id);

  if (existingProduct) {
    // If the product is already in the cart, increase its quantity
    existingProduct.Quantity += 1;
  } else {
    // If it's not in the cart, add it with an initial quantity of 1
    product.Quantity = 1;

    cart.push(product);
  }

  setLocalStorage("so-cart", cart);
}
async function addToCartHandler(e) {
  e.preventDefault();
  const product = await findProductById(e.target.dataset.id);
  addProductToCart(product);
}

document
  .getElementById("addToCart")
  .addEventListener("click", addToCartHandler);
