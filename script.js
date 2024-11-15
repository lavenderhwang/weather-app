// api real time var: temp_c (celcius temp), temp_f (fanhetic temp), condition:icon (weather icon url)
let city, degree, apiURL;
const form = document.getElementById("form");

const displayCondition = document.getElementById("condition");
const displayIcon = document.getElementById("icon");
const displayTemp = document.getElementById("temp");

form.addEventListener("submit", async (event) => {
  event.preventDefault();
  const formData = new FormData(form);
  city = formData.get("city");
  degree = formData.get("degree");
  console.log(city);
  console.log(degree);

  const encodedCity = encodeURIComponent(city);
  const apiKey = "71ab75d347cb49909fa232133241411";
  apiURL = `http://api.weatherapi.com/v1//current.json?key=${apiKey}&q=${encodedCity}`;

  await fetchData();
});

async function fetchData() {
  try {
    const response = await fetch(apiURL);
    if (!response.ok) {
      throw new Error("Could not fetch resource");
    }
    const data = await response.json();
    const condition = data.current.condition.text;
    const icon = data.current.condition.icon;
    const tempCelcius = data.current.temp_c;
    const tempFharen = data.current.temp_f;

    populateDisplay(condition, icon, tempCelcius, tempFharen);
  } catch (error) {
    console.error(error);
    displayCondition.innerText = "Location Not Found";
    displayIcon.src = "";
    displayTemp.textContent = "";
  }
}

function populateDisplay(condition, icon, celciusTemp, fahrenTemp) {
  // Get the display elements

  // Update the display elements
  displayCondition.textContent = condition; // Set the condition text
  displayIcon.src = icon; // Set the weather icon image
  displayIcon.alt = condition; // Set the alt text for the icon

  // Set the temperature based on the selected degree
  if (degree === "celcius") {
    displayTemp.textContent = `${celciusTemp}°C`; // Temperature in Celsius
  } else {
    displayTemp.textContent = `${fahrenTemp}°F`; // Temperature in Fahrenheit
  }
}
