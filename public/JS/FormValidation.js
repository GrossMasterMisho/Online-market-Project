const validateForm = (form) => {
  const password = document.forms[form]["password"].value;
  const confirm = document.forms[form]["confirm"].value;
  const err = document.getElementById("passwordNotMatch");
  if (!(password === confirm)) {
    err.style.display = "block";
    err.innerHTML = "Passwords don't match";
  } else {
    err.style.display = "none";
  }

  if (password.length < 6) {
    err.style.display = "block";
    err.innerHTML = "Password should be minimum 6 letters long.";
  }
  return password === confirm && password.length >= 6;
};
