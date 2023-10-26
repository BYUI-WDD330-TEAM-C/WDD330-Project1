import { getLocalStorage } from "./utils.mjs";
import { checkout } from "./externalServices.mjs";

function formDataToJSON(formElement) {
  const formData = new FormData(formElement),
    convertedJSON = {};

  formData.forEach(function (value, key) {
    convertedJSON[key] = value;
  });

  return convertedJSON;
}

function packageItems(items) {
  const simplifiedItems = items.map((item) => {
    console.log(item);
    return {
      id: item.Id,
      price: item.FinalPrice,
      name: item.Name,
      quantity: 1,
    };
  });
  return simplifiedItems;
}

function addPrice(checkoutProcess) {
  const cartItems = getLocalStorage("so-cart");
  const total = cartItems.reduce(
    (acc, item) => acc + item.FinalPrice * item.Quantity,
    0
  );

  // Calculate the total item count
  const totalItems = cartItems.reduce((count, item) => count + item.Quantity, 0);

  // Store these values in the checkoutProcess object
  checkoutProcess.itemTotal = total.toFixed(2);
  checkoutProcess.totalItems = totalItems;
}

const checkoutProcess = {
  key: "",
  outputSelector: "",
  list: [],
  itemTotal: 0,
  totalItems: 0,
  shipping: 0,
  tax: 0,
  orderTotal: 0,
  init: function (key, outputSelector) {
    this.key = key;
    this.outputSelector = outputSelector;
    this.list = getLocalStorage(key);
    this.calculateItemSummary();
  },
  calculateItemSummary: function () {
    const summaryElement = document.querySelector(
      this.outputSelector + " #cartTotal"
    );
    const itemNumElement = document.querySelector(
      this.outputSelector + " #num-items"
    );
    itemNumElement.innerText = this.totalItems; // Use the value from addPrice
    summaryElement.innerText = "$" + this.itemTotal;
  },
  calculateOrdertotal: function () {
    this.shipping = 10 + (this.list.length - 1) * 2;
    this.tax = (parseFloat(this.itemTotal) * 0.06).toFixed(2);
    this.orderTotal = (
      parseFloat(this.itemTotal) +
      parseFloat(this.shipping) +
      parseFloat(this.tax)
    ).toFixed(2);
    this.displayOrderTotals();
  },
  displayOrderTotals: function () {
    const shipping = document.querySelector(this.outputSelector + " #shipping");
    const tax = document.querySelector(this.outputSelector + " #tax");
    const orderTotal = document.querySelector(
      this.outputSelector + " #orderTotal"
    );
    shipping.innerText = "$" + this.shipping;
    tax.innerText = "$" + this.tax;
    orderTotal.innerText = "$" + this.orderTotal;
  },
  checkout: async function (form) {
    const json = formDataToJSON(form);
    // add totals, and item details
    json.orderDate = new Date();
    json.orderTotal = this.orderTotal;
    json.tax = this.tax;
    json.shipping = this.shipping;
    json.items = packageItems(this.list);
    console.log(json);
    try {
      const res = await checkout(json);
      console.log(res);
    } catch (err) {
      console.log(err);
    }
  },
};

// Call addPrice to calculate the initial values
addPrice(checkoutProcess);

export default checkoutProcess;
