// Get the modal
const modal = document.getElementById("id01");

// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
};

(function () {
  const pathname = window.location.pathname;
  if (pathname.startsWith("/login")) {
    modal.style.display = "block";
    const search = new URLSearchParams(window.location.search);
    const info = search.get("info");
    if (info) {
      document.getElementById("errorMessage").innerHTML = info;
    }
  } else {
    const user = getCookie("username");
    if (user) {
      document.getElementById("loginBtn").style.display = "none";
      document.getElementById("dropdown").style.display = "block";
      document.getElementById("dropdown-label").innerHTML = user;
    }
  }
})();
