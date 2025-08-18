package com.example.weatherApi.dto;

public class DayTemp {
    private String data;
    private Double minTemp;
    private Double avgTemp;
    private Double maxTemp;

    public String getData() {
        return data;
    }

    public void setData(String data) {
        this.data = data;
    }

    // Corrected getter: no parameter
    public Double getMinTemp() {
        return minTemp;
    }

    public void setMinTemp(Double minTemp) {
        this.minTemp = minTemp;
    }

    // Corrected getter: no parameter
    public Double getMaxTemp() {
        return maxTemp;
    }

    public void setMaxTemp(Double maxTemp) {
        this.maxTemp = maxTemp;
    }

    // Corrected getter: no parameter
    public Double getAvgTemp() {
        return avgTemp;
    }

    public void setAvgTemp(Double avgTemp) {
        this.avgTemp = avgTemp;
    }
}