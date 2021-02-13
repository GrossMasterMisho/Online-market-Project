const promiseOfSomeData = fetch("/cart/products")
  .then((r) => {
    return r.json();
  })
  .then((data) => {
    return data;
  });

window.onload = async () => {
  await promiseOfSomeData.then((res) => {
    res.forEach((product) => {
      createCartItem(product);
    });
  });
};

const createCartItem = (product) => {
  const shoppingCart = document.getElementsByClassName("shopping-cart")[0];
  const item = document.createElement("div");
  item.className = "item";
  item.id = product._id;
  shoppingCart.appendChild(item);
  const buttons = document.createElement("div");
  buttons.className = "buttons";
  const deleteButton = document.createElement("span");
  deleteButton.className = "delete-btn";
  deleteButton.innerHTML =
    '<i class="fa fa-trash-o" style="font-size: 24px"></i>';
  deleteButton.addEventListener("click", () => {
    fetch("cart/delete/" + product._id, {
      method: "DELETE",
    }).then((response) => {
      if (response.status === 200) {
        item.style.display = "none";
        const input = document.getElementById("quantity" + product._id);
        if (input.value === "0") return;
        input.value = Number(input.value) - 1;
        total.innerHTML = Number(total.innerHTML) - 549.0;
      }
    });
  });
  buttons.appendChild(deleteButton);
  item.appendChild(buttons);
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
  inp.className = "inp";
  plusButton.addEventListener("click", () => {
    const input = document.getElementById("quantity" + product._id);
    input.value = Number(input.value) + 1;
    total.innerHTML = Number(total.innerHTML) + 549.0;
  });

  minusButton.addEventListener("click", () => {
    const input = document.getElementById("quantity" + product._id);
    if (input.value === "0") return;
    input.value = Number(input.value) - 1;
    total.innerHTML = Number(total.innerHTML) - 549.0;
  });

  quantity.appendChild(plusButton);
  quantity.appendChild(inp);
  quantity.appendChild(minusButton);
  item.appendChild(quantity);

  item.insertAdjacentHTML("beforeend", '<div class="total-price">$549</div>');
  const total = document.getElementById("price");
  total.innerHTML = Number(total.innerHTML) + 549.25;
};

function buy() {
  const products = document.getElementsByClassName("item");
  let boughtItems = [];
  for (let product of products) {
    if (product.style.display !== "none") {
      boughtItems.push({
        id: product.id,
        value: document.getElementById("quantity" + product.id).value,
      });
    }
  }
  fetch("/orders", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify(boughtItems),
  }).then(() => {
    console.log("fetching");
    fetch("/cart/deleteAll", {
      method: "DELETE",
    }).then(() => {
      window.location.href = "/";
    });
  });
}
