from flask import Flask, jsonify
from flask_cors import CORS
import requests

app = Flask(__name__)
CORS(app)

API_KEY = "8b6561eb9a9d9709d6ad0299b74973a6"

@app.route("/weather/<city>")
def get_weather(city):

    url = f"https://api.openweathermap.org/data/2.5/weather?q={city}&appid={API_KEY}&units=metric"

    response = requests.get(url)

    data = response.json()

    if response.status_code != 200:
        return jsonify({
            "error": "City not found"
        }), 404

    # WEATHER DATA

    temperature = round(data["main"]["temp"])
    feels_like = round(data["main"]["feels_like"])
    humidity = data["main"]["humidity"]
    weather_condition = data["weather"][0]["main"]
    wind_speed = round(data["wind"]["speed"])
    pressure = data["main"]["pressure"]

    # LOCATION COORDINATES

    latitude = data["coord"]["lat"]
    longitude = data["coord"]["lon"]

    # AI WEATHER PREDICTION

    ai_message = "Weather looks normal today."

    if temperature >= 40:

        ai_message = (
            "Extreme heat detected. Stay hydrated and avoid direct sunlight."
        )

    elif weather_condition == "Rain":

        ai_message = (
            "Rain expected today. Carry an umbrella."
        )

    elif humidity >= 80:

        ai_message = (
            "High humidity detected. It may feel hotter than usual."
        )

    elif wind_speed >= 15:

        ai_message = (
            "Strong winds outside. Travel carefully."
        )

    elif temperature <= 10:

        ai_message = (
            "Very cold weather detected. Wear warm clothes."
        )

    # FINAL RESPONSE

    weather_data = {

        "city": data["name"],
        "country": data["sys"]["country"],

        "temperature": temperature,
        "feels_like": feels_like,

        "humidity": humidity,
        "weather": weather_condition,
        "wind": wind_speed,
        "pressure": pressure,

        "lat": latitude,
        "lon": longitude,

        "ai_prediction": ai_message

    }

    return jsonify(weather_data)

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000, debug=True)