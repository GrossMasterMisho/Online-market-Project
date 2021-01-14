const validateForm = () => {
  const password = document.forms["registrationForm"]["password"].value;
  const confirm = document.forms["registrationForm"]["confirm"].value;
  if (!(password === confirm)) {
    document.getElementById("passwordNotMatch").style.display = "block";
  } else {
    document.getElementById("passwordNotMatch").style.display = "none";
  }
  return password === confirm;
};
