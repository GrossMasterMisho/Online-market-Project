const promiseOfSomeData = fetch("/product/fetchProducts")
  .then((r) => r.json())
  .then((data) => {
    return data;
  });

window.onload = async () => {
  await promiseOfSomeData.then((res) => {
    var content = document.getElementsByClassName("content")[0];
    res.forEach((image) => {
      var product = document.createElement("div");
      product.className = "grid-item";
      var card = document.createElement("div");
      card.className = "card";
      var img = document.createElement("img");
      img.src =
        "data:image/" + image.img.contentType + ";base64," + image.img.data;
      card.appendChild(img);
      var title = document.createElement("h1");
      title.innerHTML = image.name;
      card.appendChild(title);
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

      // <h1>Tailored Jeans</h1>
      //     <p class="price">$19.99</p>
      //     <p>Some text about the jeans..</p>
      //     <p><button>Add to Cart</button></p>
    });
  });
};
