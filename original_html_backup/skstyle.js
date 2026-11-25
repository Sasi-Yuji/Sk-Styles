document.getElementById('emailform').addEventListener('submit', function (event) {
  const email = document.getElementById('email').value.trim();
  const result = document.getElementById('result');

  const pattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-z]{2,}$/;

  if (email === "") {
    event.preventDefault();
    result.textContent = "Enter an email";
    result.style.color = "red";
  }
  else if (!pattern.test(email)) {
    event.preventDefault();
    result.textContent = "Invalid Email Address";
    result.style.color = "red";
  }
  else {
    result.textContent = "";
  }
});