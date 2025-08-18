package com.example.weatherApi.dto;

public class WeatherRespons {
    private String city;
    private String region;
    private String country;
    private String Condition;
    private Double temperature;

    public WeatherRespons(String city, String country, String region, String condition, Double temperature) {
        this.city = city;
        this.country = country;
        this.region = region;
        Condition = condition;
        this.temperature = temperature;
    }

    public WeatherRespons() {
    }

    public String getCity() {
        return city;
    }

    public void setCity(String city) {
        this.city = city;
    }

    public String getRegion() {
        return region;
    }

    public void setRegion(String region) {
        this.region = region;
    }

    public String getCountry() {
        return country;
    }

    public void setCountry(String country) {
        this.country = country;
    }

    public String getCondition() {
        return Condition;
    }

    public void setCondition(String condition) {
        Condition = condition;
    }

    public Double getTemperature() {
        return temperature;
    }

    public void setTemperature(Double temperature) {
        this.temperature = temperature;
    }
}
