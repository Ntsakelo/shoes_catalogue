const navLinks = document.querySelectorAll(".nav-link");
const handlebarsElm = document.querySelector(".productListTemplate");
const brandHandleBars = document.querySelector(".brandListTemplate");
const sizeHandleBars = document.querySelector(".sizeListTemplate");
const colorHandleBars = document.querySelector(".colorListTemplate");
const cartHandlebars = document.querySelector(".cartListTemplate");
const itemsDisplay = document.querySelector("#itemsDisplay");
const cartItemDisplay = document.querySelector(".items");
const showCart = document.querySelectorAll(".showCart");
const cartCount = document.querySelectorAll(".count");
const brandDisplay = document.querySelector(".brandSelect");
const sizeDisplay = document.querySelector(".sizeSelect");
const colorDisplay = document.querySelector(".colorSelect");
const searchBtn = document.querySelector(".searchBtn");
const updtBtn = document.querySelector(".updtBtn");
const updtProduct = document.querySelector(".updtProduct");
const updtQty = document.querySelector(".updtQty");
const cancelBasket = document.querySelector(".cancelBasket");
const purchaseBtn = document.querySelector(".purchaseBtn");

//ADD NEW PRODUCT DOM ELEMENTS
const addBtn = document.querySelector(".addBtn");
const category = document.querySelector(".itemCategory");
const brand = document.querySelector(".itemBrand");
const edition = document.querySelector(".itemEdition");
const color = document.querySelector(".itemColor");
const size = document.querySelector(".itemSize");
const qty = document.querySelector(".itemQty");
const price = document.querySelector(".itemPrice");
const img_url = document.querySelector(".itemImg");
//instance

let shoesCatalogue = ShoesCatalogue(shoeList);
let items = shoesCatalogue.categoryFilter("all");

function addClickEvent() {
  navLinks.forEach((item) => {
    item.addEventListener("click", function () {
      if (item.classList.contains("womenLink")) {
        items = shoesCatalogue.categoryFilter("women");
      } else if (item.classList.contains("menLink")) {
        items = shoesCatalogue.categoryFilter("men");
      } else if (item.classList.contains("kidsLink")) {
        items = shoesCatalogue.categoryFilter("kids");
      } else {
        items = shoesCatalogue.categoryFilter("all");
      }

      displayProducts();
      // cartClickEvent();
    });
  });
}
function displayProducts() {
  const template = Handlebars.compile(handlebarsElm.innerHTML);
  itemsDisplay.innerHTML = template({
    productList: items,
  });

  cartClickEvent();
}

function brandDropDown() {
  const template = Handlebars.compile(brandHandleBars.innerHTML);
  brandDisplay.innerHTML = template({
    brand: shoesCatalogue.brandNames(),
  });
}
function sizeDropDown() {
  const template = Handlebars.compile(sizeHandleBars.innerHTML);
  sizeDisplay.innerHTML = template({
    size: shoesCatalogue.shoeSizes(),
  });
}
function colorDropDown() {
  const template = Handlebars.compile(colorHandleBars.innerHTML);
  colorDisplay.innerHTML = template({
    color: shoesCatalogue.shoeColors(),
  });
}
searchBtn.addEventListener("click", function () {
  shoesCatalogue.getSearchData(
    brandDisplay.value,
    Number(sizeDisplay.value),
    colorDisplay.value
  );
  items = shoesCatalogue.shoeSearch();

  displayProducts();
});
updtBtn.addEventListener("click", function () {
  shoesCatalogue.updateProductQty(updtProduct.value, Number(updtQty.value));
  displayProducts();
});
addBtn.addEventListener("click", function () {
  let id = items.length + 1;

  shoesCatalogue.addProduct(
    id,
    category.value,
    brand.value,
    edition.value,
    color.value,
    Number(size.value),
    Number(qty.value),
    Number(price.value),
    toString(img_url.value)
  );

  console.log(items);
  displayProducts();
});
function cartClickEvent() {
  const cartBtn = document.querySelectorAll(".cartBtn");
  cartBtn.forEach((item) => {
    item.addEventListener("click", function () {
      shoesCatalogue.cartItems(item.id);
      items.forEach((product) => {
        if (product.id === Number(item.id)) {
          product.qty -= 1;
          displayProducts();
        }
      });
      cartCount.forEach((item) => {
        item.innerHTML = shoesCatalogue.getCartList().length;
      });
    });
  });
}
//nothing to do with the subtraction
function cartalogue() {
  showCart.forEach((item) => {
    item.addEventListener("click", function () {
      const template = Handlebars.compile(cartHandlebars.innerHTML);
      cartItemDisplay.innerHTML = template({
        cartItem: shoesCatalogue.getCartList(),
      });
    });
  });
}

//cancel catalogue;
cancelBasket.addEventListener("click", function () {
  shoesCatalogue.cancelPurchase();
  cartCount.forEach((item) => {
    item.innerHTML = shoesCatalogue.getCartList().length;
  });
  displayProducts();
});
purchaseBtn.addEventListener("click", function () {
  shoesCatalogue.purchase();
  cartCount.forEach((item) => {
    item.innerHTML = shoesCatalogue.getCartList().length;
  });
  displayProducts();
});
brandDropDown();
sizeDropDown();
colorDropDown();
displayProducts();
cartalogue();
addClickEvent();
