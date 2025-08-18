package com.example.weatherApi.dto;

import java.util.List;

public class WeatherForecast {
    private WeatherRespons weatherRespons;
    private List<DayTemp> dayTemp;

    public WeatherRespons getWeatherRespons() {
        return weatherRespons;
    }

    public void setWeatherRespons(WeatherRespons weatherRespons) {
        this.weatherRespons = weatherRespons;
    }

    public List<DayTemp> getDayTemp() {
        return dayTemp;
    }

    public void setDayTemp(List<DayTemp> dayTemp) {
        this.dayTemp = dayTemp;
    }


}
