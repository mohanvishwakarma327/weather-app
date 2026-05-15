import { useState } from "react";
import "./App.css";

function App() {

  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);

  // DROPDOWN
  const [showDropdown, setShowDropdown] = useState(false);

  // CITY LIST
  const cities = [
    "Amsterdam",
    "Athens",
    "Ahmedabad",
    "Bangalore",
    "Bangkok",
    "Barcelona",
    "Beijing",
    "Berlin",
    "Boston",
    "Chennai",
    "Chicago",
    "Delhi",
    "Dubai",
    "Dublin",
    "Goa",
    "Gorakhpur",
    "Hyderabad",
    "Hong Kong",
    "Istanbul",
    "Jakarta",
    "Kolkata",
    "Kyoto",
    "London",
    "Los Angeles",
    "Lucknow",
    "Madrid",
    "Melbourne",
    "Mumbai",
    "Moscow",
    "New York",
    "Noida",
    "Oslo",
    "Paris",
    "Pune",
    "Rome",
    "Seoul",
    "Singapore",
    "Sydney",
    "Tokyo",
    "Toronto",
    "Vancouver",
    "Vasai",
    "Zurich"
  ];

  // FILTER CITY LIST
  const filteredCities =
    city.length > 0
      ? cities.filter((item) =>
          item.toLowerCase().startsWith(city.toLowerCase())
        )
      : [];

  // GET WEATHER
  const getWeather = async (selectedCity = city) => {

    if (!selectedCity) return;

    try {

      const response = await fetch(
        `http://192.168.1.102:5000/weather/${selectedCity}`
      );

      const data = await response.json();

      setWeather(data);

      setCity(selectedCity);

      // HIDE DROPDOWN
      setShowDropdown(false);

    } catch (error) {

      console.log(error);

      alert("Error fetching weather");

    }
  };

  // WEATHER BACKGROUND
  const weatherBackground = () => {

    if (!weather) return "default-bg";

    switch (weather.weather) {

      case "Clear":
        return "clear-bg";

      case "Clouds":
        return "cloud-bg";

      case "Rain":
        return "rain-bg";

      case "Thunderstorm":
        return "storm-bg";

      case "Haze":
        return "haze-bg";

      default:
        return "default-bg";
    }
  };

  return (

    <div className={`app ${weatherBackground()}`}>

      <div className="overlay">

        <div className="weather-container">

          {/* TITLE */}
          <h1 className="title">
            AI Weather
          </h1>

          {/* SEARCH */}
          <div className="search-wrapper">

            <div className="search-box">

              <input
                type="text"
                placeholder="Search city..."
                value={city}
                onChange={(e) => {

                  setCity(e.target.value);

                  setShowDropdown(true);

                }}
              />

              <button onClick={() => getWeather()}>
                Search
              </button>

            </div>

            {/* DROPDOWN */}
            {showDropdown &&
              city.length > 0 &&
              filteredCities.length > 0 && (

              <div className="dropdown">

                {filteredCities.map((item, index) => (

                  <div
                    key={index}
                    className="dropdown-item"
                    onClick={() => {

                      setCity(item);

                      getWeather(item);

                    }}
                  >
                    📍 {item}
                  </div>

                ))}

              </div>

            )}

          </div>

          {/* WEATHER DATA */}
          {weather && (

            <div className="weather-card">

              {/* TOP */}
              <div className="top-section">

                <div>

                  <h2>
                    📍 {weather.city}, {weather.country}
                  </h2>

                  <p className="condition">
                    {weather.weather}
                  </p>

                  <p className="feels-like">
                    Feels Like {weather.feels_like}°C
                  </p>

                </div>

                <h1 className="temp">
                  {weather.temperature}°C
                </h1>

              </div>

              {/* AI PREDICTION */}
              <div className="ai-box">

                <h3>
                  🤖 AI Weather Prediction
                </h3>

                <p>
                  {weather.ai_prediction}
                </p>

              </div>

              {/* FORECAST + MAP */}
              <div className="forecast-map-container">

                {/* FORECAST */}
                <div className="forecast-card">

                  <h3 className="forecast-title">
                    📅 7-Day Forecast
                  </h3>

                  <div className="forecast-list">

                    <div className="forecast-item">
                      <span>Mon</span>
                      <span>☀️ Sunny</span>
                      <span>35° / 29°</span>
                    </div>

                    <div className="forecast-item">
                      <span>Tue</span>
                      <span>⛅ Cloudy</span>
                      <span>34° / 28°</span>
                    </div>

                    <div className="forecast-item">
                      <span>Wed</span>
                      <span>🌧 Rain</span>
                      <span>32° / 27°</span>
                    </div>

                    <div className="forecast-item">
                      <span>Thu</span>
                      <span>☁️ Haze</span>
                      <span>31° / 26°</span>
                    </div>

                    <div className="forecast-item">
                      <span>Fri</span>
                      <span>⛈ Storm</span>
                      <span>30° / 25°</span>
                    </div>

                    <div className="forecast-item">
                      <span>Sat</span>
                      <span>🌦 Rain</span>
                      <span>29° / 24°</span>
                    </div>

                    <div className="forecast-item">
                      <span>Sun</span>
                      <span>☀️ Clear</span>
                      <span>33° / 27°</span>
                    </div>

                  </div>

                </div>

                {/* MAP */}
                <div className="map-card">

                  <h3 className="forecast-title">
                    🗺 Weather Map
                  </h3>

                  <iframe
                    title="weather-map"
                    src={`https://embed.windy.com/embed2.html?lat=${weather.lat}&lon=${weather.lon}&zoom=5&level=surface&overlay=wind&product=ecmwf`}
                  ></iframe>

                </div>

              </div>

              {/* DETAILS */}
              <div className="details-grid">

                <div className="detail-box">
                  <p>Humidity</p>
                  <h3>{weather.humidity}%</h3>
                </div>

                <div className="detail-box">
                  <p>Wind Speed</p>
                  <h3>{weather.wind} km/h</h3>
                </div>

                <div className="detail-box">
                  <p>Pressure</p>
                  <h3>{weather.pressure} hPa</h3>
                </div>

                <div className="detail-box">
                  <p>Condition</p>
                  <h3>{weather.weather}</h3>
                </div>

              </div>

            </div>

          )}

        </div>

      </div>

    </div>

  );
}

export default App;