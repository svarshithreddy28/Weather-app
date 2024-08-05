// Select elements
const searchBtn = document.querySelector("#search");
const searchInput = document.querySelector("input");

const tempratureElem = document.querySelector(".temprature");
const locationElem = document.querySelector(".location");
const emojiImg = document.querySelector(".emoji");
const timeElem = document.querySelector(".time");
const dayElem = document.querySelector(".Day");
const dateElem = document.querySelector(".Date");
const conditionElem = document.querySelector(".condition");

// Event listener
searchBtn.addEventListener("click", async function () {
    // Get the input value
    const location = searchInput.value.trim();
    // Check if input is not empty
    if (location !== "") {
        try {
            // Fetch weather data
            const data = await fetchWeather(location);
            // Update DOM if data is not null
            if (data != null) {
                updateDOM(data);
            }
            searchInput.value = "";
        } catch (error) {
            console.error("Error fetching weather data:", error);
            alert("An error occurred while fetching the weather data. Please try again.");
        }
    } else {
        alert("Please enter a location.");
    }
});

// Function to update the DOM with weather data
function updateDOM(data) {
    console.log("Updating the DOM", data);
    const temp = data.current.temp_c;
    const location = data.location.name;
    const timeData = data.location.localtime;
    const [date, time] = timeData.split(" ");
    const iconLink = data.current.condition.icon;
    const condition = data.current.condition.text;

    // Update DOM elements
    tempratureElem.textContent = `${temp}°C`;
    locationElem.textContent = location;
    emojiImg.src = iconLink;
    dateElem.innerText = date;
    timeElem.innerText = time;
    conditionElem.innerText = condition;
}

// Function to fetch weather data
async function fetchWeather(location) {
    const apiKey = '4f00639c2db9450dab713942240408'; // Replace with your API key
    const url = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${location}&aqi=no`;

    try {
        const response = await fetch(url);
        if (response.status === 400) {
            alert("Location is invalid");
            return null;
        } else if (response.ok) {
            const json = await response.json();
            return json;
        } else {
            throw new Error(`Unexpected response status: ${response.status}`);
        }
    } catch (error) {
        console.error("Fetch error:", error);
        alert("Failed to fetch weather data. Please check your network connection and try again.");
        return null;
    }
}
