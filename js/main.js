//GET LOCATION
if(navigator.geolocation){
    navigator.geolocation.getCurrentPosition(function(position){

        // Get position with latitude and longitude
        var lat = position.coords.latitude;
        var lng = position.coords.longitude;

        // Check position on google maps
        var geocoder = new google.maps.Geocoder();
        var latlng = new google.maps.LatLng(lat, lng);
        geocoder.geocode({'latLng': latlng}, function(results, status)
        {
            if (status == google.maps.GeocoderStatus.OK)
            {
                if (results[0]) {




                    var api = 'https://api.openweathermap.org/data/2.5/weather?lat=' + lat + '&lon=' + lng + '&appid=6d239f6a4b210f0cdaf9be0e8fe81560';
                    $.getJSON(api, function(data) {
                        var weather_icon = data.weather[0].icon;
                        var weather = data.weather[0].main;
                        var degrees =  (data.main.temp - 273.15);
                        var city = data.name;
                        var country = data.sys.country;

                        $("#location")
                            .html("Weather and forecasts in " + city + ", " + country);

                        $("#icon").html("<img src='https://openweathermap.org/img/w/" + weather_icon + ".png' alt='Icon depicting current weather.'> ");
                        $("#degrees").html(Math.round(degrees) + " °C");

                        $("#description").html(data.weather[0].main);
                        $("#humidity").html("Humidity: " + data.main.humidity + " %");
                        $("#pressure").html("Pressure: " + data.main.pressure + " mb");
                        $("#wind-speed").html("Wind speed: " + data.wind.speed + " km/h");


                        if(weather.toLowerCase() === "clear"){
                            document.body.style.backgroundImage =
                                "url('https://ak3.picdn.net/shutterstock/videos/16997083/thumb/1.jpg?i10c=img.resize(height:160)')";
                        }
                        else if(weather.toLowerCase() === "snow"){

                            document.body.style.backgroundImage =
                                "url('https://wallpapercave.com/wp/k15SYSI.jpg')";
                        }

                        else if(weather.toLowerCase() === "rain"){

                            document.body.style.backgroundImage =
                                "url('https://cdn.allwallpaper.in/wallpapers/1152x768/4324/night-rain-skies-water-weather-1152x768-wallpaper.jpg')";
                        }

                        else{

                            document.body.style.backgroundImage =
                                "url('https://www.wur.nl/upload_mm/8/d/2/b223d9fb-1217-432f-8e52-7bb4908d4fba_wolken_lucht_shutterstock_193491221.jpg')";
                        }

                        //Add Event listener to change from celsius to fahrenheit
                        var temp = degrees;
                        var fahr =  Math.floor(1.8 *(data.main.temp - 273.15) + 32);


                        document.getElementById("change").addEventListener("click", function(){
                            if(degrees == temp){

                                degrees = Math.round(1.8 * degrees + 32);
                                $("#degrees").html(degrees + " °F");

                            }else{
                                degrees = Math.round((degrees - 32) / 1.8);
                                $("#degrees").html(degrees + " °C");


                            }

                        });


                    });


                    // 5 Days Weather

                    var fiveDays = 'https://api.openweathermap.org/data/2.5/forecast?lat=' + lat + '&lon=' + lng + '&appid=6d239f6a4b210f0cdaf9be0e8fe81560';


                    $.getJSON(fiveDays, function(getDays){
                        var firstDay = getDays.list[0].main.temp;
                        var firstHour = getDays.list[0].dt_txt.split('').slice(11,16).join('');
                        var firstWeather = getDays.list[0].weather[0].icon;
                        var secondDay = getDays.list[1].main.temp;
                        var secondHour = getDays.list[1].dt_txt.split('').slice(11,16).join('');
                        var secondWeather = getDays.list[1].weather[0].icon;
                        var thirdDay = getDays.list[2].main.temp;
                        var thirdHour = getDays.list[2].dt_txt.split('').slice(11,16).join('');
                        var thirdWeather = getDays.list[2].weather[0].icon;
                        var fourthDay = getDays.list[3].main.temp;
                        var fourthHour = getDays.list[3].dt_txt.split('').slice(11,16).join('');
                        var fourthWeather = getDays.list[3].weather[0].icon;
                        var fifthDay = getDays.list[4].main.temp;
                        var fifthHour = getDays.list[4].dt_txt.split('').slice(11,16).join('');
                        var fifthWeather = getDays.list[4].weather[0].icon;
                        var sixtDat = getDays.list[5].main.temp;
                        var sixthHour = getDays.list[5].dt_txt.split('').slice(11,16).join('');
                        var sixthWeather = getDays.list[5].weather[0].icon;
                        var seventhDay = getDays.list[6].main.temp;
                        var seventhHour = getDays.list[6].dt_txt.split('').slice(11,16).join('');
                        var seventhWeather = getDays.list[6].weather[0].icon;
                        var eightDay = getDays.list[7].main.temp;
                        var eightHour = getDays.list[7].dt_txt.split('').slice(11,16).join('');
                        var eightWeather = getDays.list[7].weather[0].icon;
                        var ninthDay = getDays.list[8].main.temp;
                        var ninthHour = getDays.list[8].dt_txt.split('').slice(11,16).join('');
                        var ninthWeather = getDays.list[8].weather[0].icon;

                        $("#firstHour")
                            .html(firstHour + "<br>" + "<img src='https://openweathermap.org/img/w/" + firstWeather + ".png' alt='Icon depicting current weather.'>"+ (Math.round(firstDay - 273.15)) + " °C");
                        $("#secondHour")
                            .html(secondHour+ "<br>" + "<img src='https://openweathermap.org/img/w/" + secondWeather + ".png' alt='Icon depicting current weather.'>" + (Math.round(secondDay - 273.15))+ " °C");
                        $("#thirdHour")
                            .html(thirdHour + "<br>" + "<img src='https://openweathermap.org/img/w/" + thirdWeather + ".png' alt='Icon depicting current weather.'>" + (Math.round(thirdDay - 273.15))+ " °C");
                        $("#fourthHour")
                            .html(fourthHour + "<br>" + "<img src='https://openweathermap.org/img/w/" + fourthWeather + ".png' alt='Icon depicting current weather.'>" + (Math.round(fourthDay - 273.15))+ " °C");
                        $("#fifthHour")
                            .html(fifthHour+ "<br>" + "<img src='https://openweathermap.org/img/w/" + fifthWeather + ".png' alt='Icon depicting current weather.'>" + (Math.round(fifthDay - 273.15))+ " °C");
                        $("#sixthHour")
                            .html(sixthHour + "<br>" + "<img src='https://openweathermap.org/img/w/" + sixthWeather + ".png' alt='Icon depicting current weather.'>" + (Math.round(sixtDat - 273.15))+ " °C");
                        $("#seventhHour").html(seventhHour + "<br>" + "<img src='https://openweathermap.org/img/w/" + seventhWeather + ".png' alt='Icon depicting current weather.'>" + (Math.round(seventhDay - 273.15))+ " °C");

                        $("#eightHour")
                            .html(eightHour + "<br>" + "<img src='https://openweathermap.org/img/w/" + eightWeather + ".png' alt='Icon depicting current weather.'>" + (Math.round(eightDay - 273.15))+ " °C");
                        $("#ninthHour")
                            .html(ninthHour + "<br>" + "<img src='https://openweathermap.org/img/w/" + ninthWeather + ".png' alt='Icon depicting current weather.'>" + (Math.round(ninthDay - 273.15))+ " °C");

                    });

                }
            }
            else
            {
                alert("Geocoder failed due to: " + status);
            }
        });
    });
}