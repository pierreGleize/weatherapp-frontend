const userConnect = JSON.parse(localStorage.getItem("userConnect"));
const newUser = JSON.parse(localStorage.getItem("newUser"));
const userNameElement = document.getElementById("userName");

const userConnectDate = JSON.parse(localStorage.getItem("userConnectDate"));
const newUserDate = JSON.parse(localStorage.getItem("newUserDate"));

if (newUser && userConnect) {
  deconnection();
  if (newUserDate > userConnectDate) {
    userNameElement.style.display = "flex";
    userNameElement.innerHTML = `Welcome ${newUser.newUser.name}`;
  } else {
    userNameElement.style.display = "flex";
    userNameElement.innerHTML = `Welcome back ${userConnect.user.name}`;
  }
} else if (newUser) {
  deconnection("newUser", "newUserDate");
  userNameElement.style.display = "flex";
  userNameElement.innerHTML = `Welcome ${newUser.newUser.name}`;
} else if (userConnect) {
  deconnection("userConnect", "userConnectDate");
  userNameElement.style.display = "flex";
  userNameElement.innerHTML = `Welcome back ${userConnect.user.name}`;
} else {
  Logout.style.display = "none";
}
function deconnection(user, date) {
  const Logout = document.getElementById("Logout");
  Logout.style.display = "flex";
  Logout.addEventListener("click", () => {
    localStorage.removeItem(user);
    localStorage.removeItem(date);
    localStorage.clear();
    userNameElement.innerHTML = "";
    Logout.style.display = "none";
  });
}

fetch("https://weatherapp-backend-kappa-seven.vercel.app/weather")
  .then((response) => response.json())
  .then((data) => {
    if (data.weather) {
      data.weather.forEach((element) => {
        document.querySelector("#cityList").innerHTML += `
				<div class="cityContainer">
				<p class="name">${element.cityName}</p>
				<p class="description">${element.description}</p>
				<img class="weatherIcon" src="images/${element.main}.png"/>
				<div class="temperature">
					<p class="tempMin">${element.tempMin}°C</p>
					<span>-</span>
					<p class="tempMax">${element.tempMax}°C</p>
				</div>
				<button class="deleteCity" id="${element.cityName}">Delete</button>
			</div>
			`;
      });
      deleteCity();
    }
  });

function deleteCity() {
  const deleteCity = document.querySelectorAll(".deleteCity");
  deleteCity.forEach((element) => {
    element.addEventListener("click", (event) => {
      const cityName = event.target.id;
      fetch(
        `https://weatherapp-backend-kappa-seven.vercel.app/weather/${cityName}`,
        {
          method: "DELETE",
        }
      )
        .then((response) => response.json())
        .then((data) => {
          if (data.result) {
            element.parentNode.remove();
          }
        });
    });
  });
}

document.querySelector("#addCity").addEventListener("click", () => {
  const cityNameInput = document.querySelector("#cityNameInput").value;
  const cityName =
    cityNameInput.charAt().toUpperCase() +
    cityNameInput.split("").splice(1).join("");

  fetch("https://weatherapp-backend-kappa-seven.vercel.app/weather", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ cityName }),
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.result) {
        document.querySelector("#cityList").innerHTML += `
			<div class="cityContainer">
				<p class="name">${data.weather.cityName}</p>
				<p class="description">${data.weather.description}</p>
				<img class="weatherIcon" src="images/${data.weather.main}.png"/>
				<div class="temperature">
					<p class="tempMin">${data.weather.tempMin}°C</p>
					<span>-</span>
					<p class="tempMax">${data.weather.tempMax}°C</p>
				</div>
				<button class="deleteCity" id="${data.weather.cityName}">Delete</button>
			</div>
					`;
        deleteCity();
        document.querySelector("#cityNameInput").value = "";
      }
    });
});
