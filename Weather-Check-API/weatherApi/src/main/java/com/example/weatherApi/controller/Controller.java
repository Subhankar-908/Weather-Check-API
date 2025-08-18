package com.example.weatherApi.controller;

import com.example.weatherApi.dto.WeatherForecast;
import com.example.weatherApi.service.WeatherService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/Weather")
@CrossOrigin
public class Controller {
    @Autowired
    private WeatherService Service;
    @GetMapping("/forecast")
    public WeatherForecast getForecast(@RequestParam String city, @RequestParam int Day){

        return Service.getforcast(city,Day);
    }


}
