const apikey = "92e8168503d550eea3f6a3918223e8d5"; // Replace with your actual API key
const apiurl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

const searchbox = document.querySelector(".search input");
const searchbtn = document.querySelector(".search button");
const weathericon = document.querySelector(".weather-icon");

async function checkweather(city) {
    if (!city) {
        alert("Please enter a city name.");
        return; 
    }

    try {
        const response = await fetch(apiurl + city + `&appid=${apikey}`);
        if(response.status == 404){
            document.querySelector(".error").style.display = "block"
            document.querySelector(".weather").style.display = "none"
        }else{

            const data = await response.json();
        
        
        
        document.querySelector(".city").innerHTML = data.name || "City not found"; 
        document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + "°C" || "N/A";
        document.querySelector(".humidity").innerHTML = data.main.humidity + "%" || "N/A";
        document.querySelector(".wind").innerHTML = data.wind.speed + "km/h" || "N/A";

        if(data.weather[0].main == "Clouds"){
            weathericon.src = "images/clouds.png";
        }
        else if(data.weather[0].main == "Clear"){
            weathericon.src = "images/clear.png";
        }
        else if(data.weather[0].main == "Rain"){
            weathericon.src = "images/rain.png";
        }
        else if(data.weather[0].main == "Drizzle"){
            weathericon.src = "images/drizzle.png";
        }
        else if(data.weather[0].main == "Mist"){
            weathericon.src = "images/mist.png";
        }

        document.querySelector(".weather").style.display ="block";
        document.querySelector(".error").style.display = "none"
        }


        
        if (!response.ok) throw new Error("City not found");

        

    } catch (error) {
        console.error(error);
        alert(error.message); 
    }
}

searchbtn.addEventListener("click", () => {
    checkweather(searchbox.value);
});

