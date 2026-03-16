async function getWeather() {
    const city = document.getElementById("citySelect").value;
    const apiKey = "8562015e7dda4490874130904261603"; // replace with your WeatherAPI key

    if (!city) { alert("Please select a city"); return; }

    const url = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}`;

    const loading = document.getElementById("loading");
    const error = document.getElementById("error");
    const result = document.getElementById("weatherResult");

    loading.classList.remove("hidden");
    error.classList.add("hidden");
    result.classList.add("hidden");

    try {
        const res = await fetch(url);
        const data = await res.json();

        if (data.error) throw new Error(data.error.message);

        document.getElementById("city").innerText = data.location.name;
        document.getElementById("temp").innerText = data.current.temp_c + " °C";
        document.getElementById("weather").innerText = data.current.condition.text;
        document.getElementById("humidity").innerText = data.current.humidity + " %";
        document.getElementById("wind").innerText = data.current.wind_kph + " kph";

        result.classList.remove("hidden");

    } catch (err) {
        error.innerText = err.message;
        error.classList.remove("hidden");
    } finally {
        loading.classList.add("hidden");
    }
}