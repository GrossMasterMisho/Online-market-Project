const promiseOfSomeData = fetch("/cart/products")
  .then((r) => {
    return r.json();
  })
  .then((data) => {
    return data;
  });

window.onload = async () => {
  await promiseOfSomeData
    .then((res) => {
      res.forEach((id) => {
        fetchProduct(id);
      });
    })
    .catch((err) => console.log(err));
};

const fetchProduct = async (id) => {
  await fetch("/product/" + id)
    .then((res) => {
      return res.json();
    })
    .then((data) => createCartItem(data))
    .catch((err) => console.log(err));
};

const createCartItem = (product) => {
  const shoppingCart = document.getElementsByClassName("shopping-cart")[0];
  const item = document.createElement("div");
  item.className = "item";
  shoppingCart.appendChild(item);
  const buttons = document.createElement("div");
  buttons.className = "buttons";
  const deleteButton = document.createElement("span");
  deleteButton.className = "delete-btn";
  deleteButton.innerHTML =
    '<i class="fa fa-trash-o" style="font-size: 24px"></i>';
  buttons.appendChild(deleteButton);
  item.appendChild(buttons);
  const img = document.createElement("div");
  console.log(product);
  img.className = "image";
  img.innerHTML =
    "<img src=" +
    "data:image/" +
    product.img.contentType +
    ";base64," +
    product.img.data +
    ' alt="" />';
  item.appendChild(img);
  const description = document.createElement("div");
  description.className = "description";
  description.innerHTML = "<span>" + product.name + "</span>";
  item.appendChild(description);
  const quantity = document.createElement("div");
  quantity.className = "quantity";
  const plusButton = document.createElement("button");
  plusButton.className = "plus-btn";
  plusButton.type = "button";
  plusButton.innerHTML = "+";
  const minusButton = document.createElement("button");
  minusButton.className = "minus-btn";
  minusButton.type = "button";
  minusButton.innerHTML = "-";
  const inp = document.createElement("input");
  inp.type = "text";
  inp.value = 1;
  inp.id = "quantity" + product._id;

  plusButton.addEventListener("click", () => {
    const input = document.getElementById("quantity" + product._id);
    input.value = Number(input.value) + 1;
  });

  minusButton.addEventListener("click", () => {
    const input = document.getElementById("quantity" + product._id);
    if (input.value === "0") return;
    input.value = Number(input.value) - 1;
  });

  quantity.appendChild(plusButton);
  quantity.appendChild(inp);
  quantity.appendChild(minusButton);
  item.appendChild(quantity);

  item.insertAdjacentHTML("beforeend", '<div class="total-price">$549</div>');
};

const w = () => {
  //   return <div class="item">
  //   <div class="buttons">
  //     <span class="delete-btn"
  //       ><i class="fa fa-trash-o" style="font-size: 24px"></i
  //     ></span>
  //   </div>
  //   <div class="image">
  //     <img src="item-1.png" alt="" />
  //   </div>
  //   <div class="description">
  //     <span>Common Projects</span>
  //     <span>Bball High</span>
  //     <span>White</span>
  //   </div>
  //   <div class="quantity">
  //     <button class="plus-btn" type="button" name="button">+</button>
  //     <input type="text" name="name" value="1" />
  //     <button class="minus-btn" type="button" name="button">-</button>
  //   </div>
  //   <div class="total-price">$549</div>
  // </div>
};
