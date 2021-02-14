window.onload = async () => {
  let urlParams = new URLSearchParams(window.location.search);
  let id = urlParams.get("id");
  fetch("/product/productId/" + id)
    .then((r) => r.json())
    .then((data) => {
      const paper = document.getElementById("paper");
      console.log(data);
      paper.innerHTML = `
      <img src= data:image/${data.img.contentType};base64,${data.img.data} class="product-image"/>
      <h1>${data.name}</h1>
      <p>Seller Name: ${data.seller}</p>
      <p>Contact Info: ${data.phone}</p>
      <p>Description: ${data.description}</p>
      <p>Price: ${data.price}$</p>
      <button class="pay-button" id="add-cart-btn">Add To Cart</button>
      `;

      document
        .getElementById("add-cart-btn")
        .addEventListener("click", async () => {
          try {
            await fetch("/product/addToCart", {
              method: "post",
              headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
              },
              body: JSON.stringify({
                productId: data._id,
              }),
            });
          } catch (err) {
            console.error(err);
          }
        });
    });
};
// const react = (data) => {
//   return (
//     <img
//       src={"data:image/" + data.img.contentType + ";base64," + data.img.data}
//     ></img>
//   );
// };
