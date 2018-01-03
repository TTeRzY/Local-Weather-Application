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
                    var city = results[0].address_components[4].short_name;
                    var country = results[0].address_components[5].short_name;
                    $("#location")
                        .html("Weather and forecasts in: " + city + ", " + country);

                    var api = 'https://api.openweathermap.org/data/2.5/weather?lat=' + lat + '&lon=' + lng + '&appid=6d239f6a4b210f0cdaf9be0e8fe81560';
                    $.getJSON(api, function(data) {
                        var weather_icon = data.weather[0].icon;
                        var weather = data.weather[0].main;
                        var degrees =  (data.main.temp - 273.15);
                        $("#weather").html("<img src='https://openweathermap.org/img/w/" + weather_icon + ".png' alt='Icon depicting current weather.'><br>" + weather + "<br>" + degrees + " °C");

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

                      //Add Event listener to change from celsius to fahrenheit
                      var graduses = "C";
                      document.getElementById("change").addEventListener("click", function(){
                        if(graduses == "C"){
                            var fahr =  Math.floor(1.8 *(data.main.temp - 273) + 32);
                            
                                $("#weather").html("<img src='https://openweathermap.org/img/w/" + weather_icon + ".png' alt='Icon depicting current weather.'><br>" + weather + "<br>" + fahr + " °F");
                              graduses = "F";
                           

                        }else{
                            document.getElementById("change").addEventListener("click", function(){
                                $("#weather").html("<img src='https://openweathermap.org/img/w/" + weather_icon + ".png' alt='Icon depicting current weather.'><br>" + weather + "<br>" + degrees + " °C");                             
graduses = "C";
                            });
                        }
                         });
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
