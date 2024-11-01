// Insert your code here
const registerName = document.getElementById("registerName");
const registerEmail = document.getElementById("registerEmail");
const registerPassword = document.getElementById("registerPassword");

const connectionEmail = document.getElementById("connectionEmail");
const connectionPassword = document.getElementById("connectionPassword");

document.getElementById("register").addEventListener("click", () => {
  const register = {
    name: registerName.value,
    email: registerEmail.value,
    password: registerPassword.value,
  };
  fetch("https://weatherapp-backend-amber-sigma.vercel.app/users/signup", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(register),
  })
    .then((response) => response.json())
    .then((data) => {
      registerName.value = "";
      registerEmail.value = "";
      registerPassword.value = "";
      if (data.result) {
        window.location.assign("index.html");
      }
    });
});

document.getElementById("connection").addEventListener("click", () => {
  const connection = {
    email: connectionEmail.value,
    password: connectionPassword.value,
  };
  fetch("https://weatherapp-backend-amber-sigma.vercel.app/users/signin", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(connection),
  })
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      connectionEmail.value = "";
      connectionPassword.value = "";
      if (data.result) {
        window.location.assign("index.html");
      }
    });
});