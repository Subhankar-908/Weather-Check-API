
// Weather Dashboard JavaScript

let currentWeatherData = null;

// Sample data for demonstration
const sampleData = {
    "weatherRespons": {
        "city": "Agra",
        "region": "Uttar Pradesh",
        "country": "India",
        "temperature": 35.6,
        "condition": "Patchy rain nearby"
    },
    "dayTemp": [
        {
            "data": "2025-08-18",
            "minTemp": 28.5,
            "avgTemp": 31.6,
            "maxTemp": 35.6
        },
        {
            "data": "2025-08-19",
            "minTemp": 28.6,
            "avgTemp": 31.9,
            "maxTemp": 36.3
        },
        {
            "data": "2025-08-20",
            "minTemp": 28.6,
            "avgTemp": 31.4,
            "maxTemp": 35.7
        }
    ]
};

// Initialize with sample data on page load
document.addEventListener('DOMContentLoaded', function() {
    displayWeatherData(sampleData);
});

// Fetch weather data from API
async function fetchWeather() {
    const city = document.getElementById('cityInput').value.trim();
    const days = document.getElementById('dayInput').value;
    
    if (!city) {
        showError('Please enter a city name');
        return;
    }
    
    showLoading();
    hideError();
    
    try {
        // Construct API URL
        const apiUrl = `http://localhost:8080/Weather/forecast?city=${encodeURIComponent(city)}&Day=${days}`;
        
        const response = await fetch(apiUrl);
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        currentWeatherData = data;
        displayWeatherData(data);
        
    } catch (error) {
        console.error('Error fetching weather data:', error);
        showError('Failed to fetch weather data. Please check if the API server is running.');
        // Show sample data as fallback
        displayWeatherData(sampleData);
    } finally {
        hideLoading();
    }
}

// Display weather data
function displayWeatherData(data) {
    if (!data || !data.weatherRespons) {
        showError('Invalid weather data received');
        return;
    }
    
    const { weatherRespons, dayTemp } = data;
    
    // Update current weather
    document.getElementById('cityName').textContent = weatherRespons.city;
    document.getElementById('regionCountry').textContent = `${weatherRespons.region}, ${weatherRespons.country}`;
    document.getElementById('currentTemp').textContent = weatherRespons.temperature;
    document.getElementById('weatherCondition').textContent = weatherRespons.condition;
    document.getElementById('lastUpdated').textContent = `Last updated: ${new Date().toLocaleString()}`;
    
    // Update weather icon based on condition
    updateWeatherIcon(weatherRespons.condition);
    
    // Display forecast
    displayForecast(dayTemp);
    
    // Show weather content
    document.getElementById('weatherContent').style.display = 'block';
}

// Update weather icon based on condition
function updateWeatherIcon(condition) {
    const iconElement = document.getElementById('weatherIcon');
    const conditionLower = condition.toLowerCase();
    
    if (conditionLower.includes('rain')) {
        iconElement.className = 'fas fa-cloud-rain';
    } else if (conditionLower.includes('sunny') || conditionLower.includes('clear')) {
        iconElement.className = 'fas fa-sun';
    } else if (conditionLower.includes('cloud')) {
        iconElement.className = 'fas fa-cloud';
    } else if (conditionLower.includes('snow')) {
        iconElement.className = 'fas fa-snowflake';
    } else if (conditionLower.includes('storm') || conditionLower.includes('thunder')) {
        iconElement.className = 'fas fa-bolt';
    } else {
        iconElement.className = 'fas fa-cloud-sun';
    }
}

// Display forecast data
function displayForecast(dayTemp) {
    const container = document.getElementById('forecastContainer');
    container.innerHTML = '';
    
    if (!dayTemp || dayTemp.length === 0) {
        container.innerHTML = '<p>No forecast data available</p>';
        return;
    }
    
    dayTemp.forEach(day => {
        const card = createForecastCard(day);
        container.appendChild(card);
    });
}

// Create forecast card
function createForecastCard(dayData) {
    const card = document.createElement('div');
    card.className = 'forecast-card';
    
    const date = new Date(dayData.data);
    const formattedDate = date.toLocaleDateString('en-US', {
        weekday: 'long',
        month: 'short',
        day: 'numeric'
    });
    
    card.innerHTML = `
        <div class="forecast-date">${formattedDate}</div>
        <div class="temp-range">
            <div class="temp-item">
                <div class="temp-label">Min</div>
                <div class="temp-value temp-min">${dayData.minTemp}°C</div>
            </div>
            <div class="temp-item">
                <div class="temp-label">Avg</div>
                <div class="temp-value temp-avg">${dayData.avgTemp}°C</div>
            </div>
            <div class="temp-item">
                <div class="temp-label">Max</div>
                <div class="temp-value temp-max">${dayData.maxTemp}°C</div>
            </div>
        </div>
    `;
    
    return card;
}

// Show loading state
function showLoading() {
    document.getElementById('loading').style.display = 'block';
    document.getElementById('weatherContent').style.display = 'none';
}

// Hide loading state
function hideLoading() {
    document.getElementById('loading').style.display = 'none';
}

// Show error message
function showError(message) {
    const errorElement = document.getElementById('errorMessage');
    const errorText = document.getElementById('errorText');
    errorText.textContent = message;
    errorElement.style.display = 'block';
}

// Hide error message
function hideError() {
    document.getElementById('errorMessage').style.display = 'none';
}

// Allow Enter key to trigger search
document.getElementById('cityInput').addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        fetchWeather();
    }
});

document.getElementById('dayInput').addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        fetchWeather();
    }
});
