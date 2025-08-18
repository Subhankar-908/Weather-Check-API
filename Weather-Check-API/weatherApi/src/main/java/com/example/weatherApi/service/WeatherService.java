package com.example.weatherApi.service;

import com.example.weatherApi.dto.*;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.ArrayList;
import java.util.List;

@Service
public class WeatherService {
    @Value("${weather.api.key}")
    private String ApiKey;

    @Value("${weather.api.url}")
    private String ApiUrl;

    @Value("${weather.api.forecast.Url}")
    private String ApiForecastUrl;

    private final RestTemplate tampleate=new RestTemplate();

    public String test(){
        return  "good";
    }

    public WeatherRespons GetData(String city){
        String Url=ApiUrl+"?key="+ApiKey+"&q="+city;
        Root response=tampleate.getForObject(Url,Root.class);
        WeatherRespons weatherRespons=new WeatherRespons();

//        String c=response.getLocation().name;
//        String region=response.getLocation().region;
//        String country=response.getLocation().country;
        String condition=response.getCurrent().getCondition().getText();

        weatherRespons.setCity(response.getLocation().name);
        weatherRespons.setRegion(response.getLocation().region);
        weatherRespons.setCountry(response.getLocation().country);
        weatherRespons.setCondition(condition);
        weatherRespons.setTemperature(response.getCurrent().getTemp_c());
        return weatherRespons;
    }
    public WeatherForecast getforcast(String city, int Day){
        WeatherForecast weatherForecast=new WeatherForecast();
        WeatherRespons weatherRespons=GetData(city);
        WeatherForecast respons=new WeatherForecast();
        List<DayTemp> dayList=new ArrayList<>();
        respons.setWeatherRespons(weatherRespons);
        String Url=ApiForecastUrl+"?key="+ApiKey+"&q="+city+"&days="+Day;
        Root ApiResponse=tampleate.getForObject(Url,Root.class);
        Forecast forecast=ApiResponse.getForecast();
        ArrayList<Forecastday> forecastdays=forecast.getForecastday();
        for(Forecastday rs:forecastdays){
            DayTemp d= new DayTemp();
            d.setData(rs.getDate());
            d.setMinTemp(rs.getDay().mintemp_c);
            d.setMaxTemp(rs.getDay().maxtemp_c);
            d.setAvgTemp(rs.getDay().avgtemp_c);
            dayList.add(d);
        }
        respons.setDayTemp(dayList);
        return respons;
    }
}
