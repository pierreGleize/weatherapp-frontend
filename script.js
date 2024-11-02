const userConnect = JSON.parse(localStorage.getItem("userConnect"));
const newUser = JSON.parse(localStorage.getItem("newUser"));

console.log(newUser.newUser.name);

if (newUser.result) {
  document.getElementById(
    "userName"
  ).innerHTML = `Welcome ${newUser.newUser.name}`;
}
// if (userConnect.result) {
//   document.getElementById(
//     "userName"
//   ).innerHTML = `Welcome back ${userConnect.user.name}`;
// }
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
      console.log(event.target);
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

document.querySelector("#addCity").addEventListener("click", function () {
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
