# Weather and News Dashboard

This project is a web application that displays current weather information and top news headlines. Users can fetch weather data for their location or any specified city and view top news headlines for different countries and categories.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Features](#features)
- [API Keys](#api-keys)
- [Project Structure](#project-structure)


## Installation

1. **Clone the repository:**
    ```bash
   git clone https://github.com/Aniket992/weather-news-dashboard.git
   cd weather-news-dashboard

 Install dependencies:


npm install
Add API keys:

Create a .env file in the root directory and add your API keys:


REACT_APP_WEATHER_API_KEY=your_openweathermap_api_key
REACT_APP_NEWS_API_KEY=your_worldnewsapi_key
Start the development server:


npm start
The application will be available at http://localhost:3000.

## Usage

Weather:

Enter a city name to fetch the current weather data for that city.
If no city is specified, the application will attempt to use the user's geolocation to fetch weather data.
News:

Select a country from the input field to fetch top news headlines for that country.
Select a news category from the dropdown to filter the news headlines.
Click on a news card to open the full news article in a new tab.

## Features


Fetch and display current weather data for any city.
Display weather data including temperature, condition, humidity, wind speed, and more.
Fetch and display top news headlines for different countries and categories.
Responsive design for an optimal viewing experience on various devices.
## API Keys
This project uses the following APIs:

OpenWeatherMap API for fetching weather data.
World News API for fetching news headlines.
Ensure you have valid API keys for these services and add them to your .env file as described in the installation steps.

## Project-structure


[../project-structure.png]