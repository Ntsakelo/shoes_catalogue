function ShoesCatalogue(productList) {
  let shoeArr;
  let searchData = {};
  let list = productList;
  let product;
  let cartList = [];
  //dropdown items

  function brandNames() {
    let brandList = [];
    list.forEach((item) => {
      if (brandList.indexOf(item.brand) < 0) {
        brandList.push(item.brand);
      }
    });
    brandList.sort();
    return brandList;
  }
  function shoeSizes() {
    let sizeList = [];
    list.forEach((item) => {
      if (sizeList.indexOf(item.size) < 0) {
        sizeList.push(item.size);
      }
    });
    sizeList.sort();
    return sizeList;
  }

  function shoeColors() {
    let colorList = [];
    list.forEach((item) => {
      if (colorList.indexOf(item.color) < 0) {
        colorList.push(item.color);
      }
    });
    colorList.sort();
    return colorList;
  }
  //filter by category
  function categoryFilter(category) {
    if (category === "men") {
      shoeArr = list.filter((item) => {
        if (item.category === "Men" || item.category === "All") {
          return item;
        }
      });
    } else if (category === "women") {
      shoeArr = list.filter((item) => {
        if (item.category === "Women" || item.category === "All") {
          return item;
        }
      });
    } else if (category === "kids") {
      shoeArr = list.filter((item) => {
        if (item.category === "Kids") {
          return item;
        }
      });
    } else {
      return list;
    }
    return shoeArr;
  }
  //filter by search
  function getSearchData(brand, size, color) {
    searchData = { brand, size, color };
  }
  function shoeSearch() {
    let brand = searchData.brand;
    let size = searchData.size;
    let color = searchData.color;
    let searchResults = list.filter((item) => {
      if (brand === item.brand && color === item.color && size === item.size) {
        return item;
      }
    });
    return searchResults;
  }
  //update quantity

  function updateProductQty(productname, qty) {
    let product = productname.charAt(0).toUpperCase() + productname.slice(1);
    list.forEach((item) => {
      if (item.edition === product) {
        item.qty += qty;
      }
    });
  }
  //add new product
  function addProduct(
    id,
    category,
    brand,
    edition,
    color,
    size,
    qty,
    price,
    img_url
  ) {
    let product = {
      id,
      category,
      brand,
      edition,
      color,
      size,
      qty,
      price,
      img_url,
    };
    list.push(product);
  }
  //function add to cart
  function cartItems(id) {
    list.find(function (item) {
      if (item.id === Number(id)) {
        if (item.qty > 0) {
          cartList.push(item);
        }
      }
    });
    return cartList;
  }
  function getCartList() {
    return cartList;
  }
  //function reduce qty
  function reduceQty() {
    cartList.forEach((item) => {
      item.qty -= 1;
    });
  }
  //cancel catalogue
  function cancelPurchase() {
    list.forEach((item) => {
      for (let i = 0; i < cartList.length; i++) {
        let product = cartList[i];
        if (item.id === product.id) {
          item.qty += 1;
        }
      }
    });
    cartList = [];
  }
  function purchase() {
    cartList = [];
  }
  return {
    categoryFilter,
    brandNames,
    shoeSizes,
    shoeColors,
    getSearchData,
    shoeSearch,
    updateProductQty,
    addProduct,
    cartItems,
    reduceQty,
    getCartList,
    cancelPurchase,
    purchase,
  };
}
