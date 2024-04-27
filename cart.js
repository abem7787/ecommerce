let products = [
  {
    name: "Mens T-Shirt",
    price: 13,
    inCart: 0,
    tag: "product1.jpg"
  },
  {
    name: "Slim Khaki Tousers",
    price: 33,
    inCart: 0,
    tag: "product2.jpg"
  },
  {
    name: "Nike Shoes",
    price: 23,
    inCart: 0,
    tag: "product3.jpg",
  },
  {
    name: "Wrist Watch",
    price: 135,
    inCart: 0,
    tag: "product4.jpg",
  },
  {
    name: "V Neck Tassel Cape",
    price: 20,
    inCart: 0,
    tag: "wproduct1.jpg",
  },
  {
    name: "Printed Wrap Dress",
    price: 20,
    inCart: 0,
    tag: "wproduct2.jpg",
  },
  {
    name: "Blue Denim Dress",
    price: 35,
    inCart: 0,
    tag: "wproduct3.jpg",
  },
  {
    name: "High Waist Denim Skirt",
    price: 40,
    inCart: 0,
    tag: "wproduct4.jpg",
  },
];

let carts = document.querySelectorAll(".add-carts");
for (let i = 0; i < carts.length; i++) {
  carts[i].addEventListener("click", () => {
    cartNumbers(products[i]);
    //totalCost(products[i])
  });
}

function onLoadCartNumbers() {
  let productNumbers = localStorage.getItem("cartNumbers")
  if (productNumbers) {
    document.querySelector(".smartCart span").textContent = productNumbers
  }
}

function cartNumbers(product) {
  let productNumbers = localStorage.getItem("cartNumbers")
  productNumbers = parseInt(productNumbers)

  if (productNumbers) {
    localStorage.setItem("cartNumbers", productNumbers + 1)
    document.querySelector(".smartCart span").textContent = productNumbers + 1
  }
  else {
    localStorage.setItem("cartNumbers", 1)
    document.querySelector(".smartCart span").textContent = 1
  }
  setItems(product)
}

function setItems(product) {
  let cartItems = localStorage.getItem("productsInCart")
  cartItems = JSON.parse(cartItems)

  if (cartItems != null) {

    if (cartItems[product.name] == undefined) {
      cartItems = {
        ...cartItems,
        [product.tag]: product
      }
    }
    cartItems[product.tag].inCart += 1
  }
  else {
    product.inCart = 1
    cartItems = {
      [product.tag]: product
    }
  }

  localStorage.setItem("productsInCart", JSON.stringify(cartItems))
}

function totalCost(product) {
  let cartCost = localStorage.getItem("totalCost")

  if (cartCost != null) {
    cartCost = parseInt(cartCost)
    localStorage.setItem("totalCost", cartCost + product.price)
  } else {
    localStorage.setItem("totalCost", product.price)
  }
}

function displayCart() {
  let cartItems = localStorage.getItem("productsInCart")
  cartItems = JSON.parse(cartItems)

  let productContainer = document.querySelector(".products-container")
  let priceProducts = document.querySelector(".product-price-container")
  let quanityProducts = document.querySelector(".quanity-Products")
  let total = document.querySelector(".total")
  let completeTotal = document.querySelector(".completeTotal")
  var sumOfProduct = 0

  if (cartItems && productContainer && priceProducts && quanityProducts && total) {
    productContainer.innerHTML = "";
    priceProducts.innerHTML = "";
    quanityProducts.innerHTML = "";
    total.innerHTML = "";
    completeTotal.innerHTML = "";

    if (Object.keys(cartItems).length === 0) {
      // Cart is empty
      productContainer.innerHTML = "<p>Your cart is empty</p>";
      return;
    }

    Object.values(cartItems).forEach(item => {
      productContainer.innerHTML += `
        <div class="flex flex-row justify-around">
          <img id="tag-img" class="h-10 w-10 class="" src="./images/products/${item.tag}">
          <div id="name-span">${item.name}</div>
        </div>`;

      priceProducts.innerHTML += `
        <div class="flex flex-row justify-around">
          <div id="price-span" class="mt-5 price">$${item.price}.00</div>
        </div>`;

      quanityProducts.innerHTML += `
        <div class="flex flex-row justify-around">
          <div  id="inCart-span"  class="mt-5 quanitity">${item.inCart}</div>
        </div>`;

      total.innerHTML += `
        <div class="flex flex-row justify-around">
          <div id="total-div" class="mt-5 total">$${item.inCart * item.price}.00</div>
        </div>`;

      sumOfProduct += item.price * item.inCart;
      completeTotal.innerHTML = sumOfProduct;
    });
  }
}

function removeItem(tag) {
  let cartItems = localStorage.getItem("productsInCart");
  cartItems = JSON.parse(cartItems);

  if (cartItems[tag]) {
    const itemPrice = cartItems[tag].price * cartItems[tag].inCart;
    delete cartItems[tag];
    localStorage.setItem("productsInCart", JSON.stringify(cartItems));

    // Update total cost
    let totalCost = localStorage.getItem("totalCost");
    totalCost = parseInt(totalCost) - itemPrice;
    localStorage.setItem("totalCost", totalCost);

    // Update cart numbers
    let cartNumbers = localStorage.getItem("cartNumbers");
    cartNumbers = parseInt(cartNumbers) - 1; // decrement by 1
    localStorage.setItem("cartNumbers", cartNumbers);

    // Refresh the cart display
    displayCart();
    onLoadCartNumbers();

    // Check if cart is empty, if so, set cart number display to zero
    if (Object.keys(cartItems).length === 0) {
      document.querySelector(".smartCart span").textContent = 0;
    }

    // Recalculate and display total amount
    calculateTotalAndStore();
  }
}

function redirectToPayment() {
  window.location.href = "payment.html"; // Replace "payment.html" with the actual URL of your payment page
}

function calculateTotalAndStore() {
  let cartItems = localStorage.getItem("productsInCart");
  cartItems = JSON.parse(cartItems);
  let total = 0;

  if (cartItems) {
    Object.values(cartItems).forEach(item => {
      total += item.price * item.inCart;
    });
  }

  document.querySelector(".completeTotal").textContent = `$${total}.00`;
  localStorage.setItem("totalAmount", total);
}

displayCart();
onLoadCartNumbers();
