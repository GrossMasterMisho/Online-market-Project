const promiseOfSomeData = (param, q) => {
  const query = param ? q + param : "";
  return fetch("/product/fetchProducts" + query)
    .then((r) => r.json())
    .then((data) => {
      return data;
    });
};

window.onload = async () => {
  let urlParams = new URLSearchParams(window.location.search);
  let myParam = urlParams.get("search");
  let query = "?search=";
  if (!myParam) {
    myParam = urlParams.get("category");
    query = "?category=";
  }
  await promiseOfSomeData(myParam, query).then((res) => {
    var content = document.getElementsByClassName("content")[0];
    res.forEach((image) => {
      var product = document.createElement("div");
      product.className = "grid-item";
      var card = document.createElement("div");

      card.className = "card";
      var img = document.createElement("img");
      img.src =
        "data:image/" + image.img.contentType + ";base64," + image.img.data;
      card.addEventListener("click", (e) => {
        if (e.target.tagName !== "BUTTON") {
          window.location.href = "/product/?id=" + image._id;
        }
      });
      card.appendChild(img);
      var title = document.createElement("h1");
      title.innerHTML = image.name;
      card.appendChild(title);
      var price = document.createElement("p");
      price.className = "price";
      price.innerHTML = image.price + "$";
      card.appendChild(price);
      var addToCart = document.createElement("button");
      addToCart.innerHTML = "Add to Cart";
      addToCart.addEventListener("click", async () => {
        try {
          await fetch("/product/addToCart", {
            method: "post",
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json",
            },
            body: JSON.stringify({
              productId: image._id,
            }),
          });
        } catch (err) {
          console.error(err);
        }
      });
      card.appendChild(document.createElement("p").appendChild(addToCart));
      card.addEventListener("click", async () => {
        try {
          await fetch("/cart", {
            method: "get",
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json",
            },
          });
        } catch (err) {
          console.error(err);
        }
      });
      product.appendChild(card);
      content.appendChild(product);
    });
  });
};
