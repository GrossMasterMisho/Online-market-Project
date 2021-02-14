const promiseOfSomeData = fetch("/orders/list")
  .then((r) => {
    return r.json();
  })
  .then((data) => {
    return data;
  });

window.onload = async () => {
  await promiseOfSomeData.then((res) => {
    res.forEach((product, index) => {
      createCartItem(product, index);
    });
  });
};

const createCartItem = (product, index) => {
  const shoppingCart = document.getElementsByClassName("shopping-cart")[0];
  const item = document.createElement("div");
  item.className = "item";
  item.id = index;
  shoppingCart.appendChild(item);

  const img = document.createElement("div");
  img.className = "image";
  img.innerHTML =
    "<img src=" +
    "data:image/" +
    product.img.contentType +
    ";base64," +
    product.img.data +
    ' alt="" />';
  item.appendChild(img);
  img.addEventListener("click", () => {
    window.location.href = "/product/?id=" + product._id;
  });
  const description = document.createElement("div");
  description.className = "description";
  description.innerHTML = "<span>" + product.name + "</span>";
  item.appendChild(description);
  const quantity = document.createElement("div");
  quantity.className = "quantity";
  const inp = document.createElement("input");
  inp.type = "text";
  inp.value = product.quantity;
  inp.id = "quantity" + index;
  inp.disabled = true;
  inp.className = "inp";
  quantity.appendChild(inp);

  item.appendChild(quantity);

  item.insertAdjacentHTML(
    "beforeend",
    `<div class="total-price">${product.price}$</div>`
  );
};
