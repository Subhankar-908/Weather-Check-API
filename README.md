# Weather Dashboard 🌤️

A simple, clean weather dashboard that shows current conditions and a multi-day forecast for any city, backed by a local weather API.

## ✨ Features

- **Current weather** — city, region/country, temperature (°C), and condition
- **Multi-day forecast** — min / avg / max temperature cards for however many days you request
- **Dynamic weather icon** — swaps between sun, rain, cloud, snow, and storm icons based on the condition text
- **Loading & error states** — spinner while fetching, friendly error message on failure
- **Graceful fallback** — falls back to sample data (Agra, India) if the API is unreachable, so the UI is never empty
- **Enter-to-search** — press Enter in either input field to trigger a fetch

## 🛠 Tech Stack

- Plain HTML, CSS, and JavaScript (no frameworks, no build step)
- [Font Awesome](https://fontawesome.com/) (via CDN) for icons
- Fetches from a local weather API

## 📁 Project Structure

```
weather-dashboard/
├── index.html      # Page markup
├── script.js       # Fetch logic, DOM rendering, icon mapping
└── styles.css      # Styling (not shown here — add your own or supply it)
```

## 🚀 Getting Started

### Prerequisites
- A modern browser
- The backend weather API running locally (expected at `http://localhost:8080`)

### Run it
Since it's static files, just open `index.html` directly in a browser, or serve it:

```bash
npx serve .
```

### Point it at your API
The endpoint is built in `script.js`:

```js
const apiUrl = `http://localhost:8080/Weather/forecast?city=${encodeURIComponent(city)}&Day=${days}`;
```

Update the base URL here if your backend runs elsewhere (e.g. a deployed API).

## 🔌 API Contract

**Request**
```
GET /Weather/forecast?city={city}&Day={days}
```

**Response**
```json
{
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
    }
  ]
}
```

| Field | Type | Notes |
|---|---|---|
| `weatherRespons.city` | string | City name |
| `weatherRespons.region` | string | Region/state |
| `weatherRespons.country` | string | Country |
| `weatherRespons.temperature` | number | Current temp in °C |
| `weatherRespons.condition` | string | Free-text condition, matched against keywords (rain/sunny/cloud/snow/storm) to pick an icon |
| `dayTemp[].data` | string (date) | Forecast date |
| `dayTemp[].minTemp` / `avgTemp` / `maxTemp` | number | Daily temps in °C |

## 🖥 Usage

1. Enter a city name (defaults to "agra")
2. Enter number of forecast days (1–7)
3. Click **Get Weather** or press Enter
4. Current conditions and forecast cards render below

## 📌 Known Notes

- The `weatherRespons` key name is intentionally kept as-is to match the current API response — rename on both ends together if you clean this up later.
- If the API call fails, the dashboard silently falls back to hardcoded sample data for Agra rather than leaving the screen blank — useful for demos, but worth surfacing more visibly in production so it isn't mistaken for live data.

