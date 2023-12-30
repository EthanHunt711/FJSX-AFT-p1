//global variables
const apiKey = "05d50d1d285e907234859232abcfbeeb";


//function for getting users location
function userCurrentLocationfiveDayForecast(){
   
    //get the current location
    navigator.geolocation.getCurrentPosition( position => {
        //longtitude
        const latitude = position.coords.latitude;
        //latitude
        const longitude = position.coords.longitude;
        
        //make the reverse geolocation url
        const reverseGeocodingUrl = `http://api.openweathermap.org/geo/1.0/reverse?lat=${latitude}&lon=${longitude}&limit=1&appid=${apiKey}`;
        
        //fetch the data from api for further usage of lat and lon and city name
        fetch(reverseGeocodingUrl).then(response => response.json()).then(locationData =>{
            
            //create the lat and lon and name variables
            const cityLatitude = locationData[0].lat;
            const cityLongitude = locationData[0].lon;
            const cityName = locationData[0].name;

            
            //create a url for fetching 5day forecast 
            const weatherForecastUrl = `http://api.openweathermap.org/data/2.5/forecast?lat=${cityLatitude}&lon=${cityLongitude}&appid=${apiKey}&units=metric`

            console.log(weatherForecastUrl)
            //fetch the data for next 5 days
            fetch(weatherForecastUrl).then(res => res.json()).then(weatherDetailsData => {
                const eachDayForecast = [];

                const fiveDayForecast = weatherDetailsData.list.filter(forecast => {
                    const forecastDate = new Date(forecast.dt_txt).getDate();
                    if(!eachDayForecast.includes(forecastDate)){
                        return eachDayForecast.push(forecastDate)
                    }
                    
                });

                console.log(fiveDayForecast)
                //add content to html
                fiveDayForecast.forEach(weatherDataDeatils => {

                    console.log(weatherDataDeatils.weather[0])
                    //target the ul in html
                    const weatherTiles = document.querySelector('.weatherTiles');

                    //create a list element
                    const weatherTile = document.createElement('li');
                    weatherTile.className = 'weatherTile';
                    weatherTiles.appendChild(weatherTile);
                    
                    //create icon div
                    const weatherIcon = document.createElement('div');
                    weatherIcon.className = 'weatherIcon';
                    const weatherIconImg = document.createElement('img');
                    weatherIconImg.setAttribute('src', `https://openweathermap.org/img/wn/${weatherDataDeatils.weather[0].icon}@2x.png`)
                    weatherIcon.appendChild(weatherIconImg);
                    weatherTile.appendChild(weatherIcon);

                    //create details for weather list element
                    const weatherDetails = document.createElement('div');
                    weatherTile.appendChild(weatherDetails);

                    //date element
                    const showDayName = document.createElement('div');
                    showDayName.className ='showDayName'
                    showDayName.innerHTML = `<h6>${weatherDataDeatils.dt_txt.split(" ")[0]}</h6>`
                    weatherDetails.appendChild(showDayName);

                    const showWeatherDetails = document.createElement('div');
                    showWeatherDetails.className = 'showWeatherDetails';
                    showWeatherDetails.innerHTML= `<h6   class="temperature">${weatherDataDeatils.main.temp}°C</h6>
                    <h6 class="details">${weatherDataDeatils.weather[0].description}</h6>`






                });



            //if data is not retrieved for 5day forecast
            }).catch(() => alert(`hittade inga information till ${cityName}`))
        
        //if data is not retrieved for reverse geolocation
        }).catch(() => {
            alert(`Ingen data kunde hämtades till denna plats`);
        })
    },
    //if user does nor permit geolocation
    error => {
        if(error.code === error.PERMISSION_DENIED){
            alert("plats ehörighet inte godkänd. Ändra inställningar för att hämta plats")
        }
    }
    );
    
    
};

userCurrentLocationfiveDayForecast();

