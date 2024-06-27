const box=document.querySelector(".box");
const search=document.querySelector(".search button");
const info=document.querySelector(".weather-box");
const details=document.querySelector(".details");
const error=document.querySelector(".notfound");


search.addEventListener("click",() =>{
    const APIKey ='2510a405fb8f43439990ca1540f3ee27';
    const location=document.querySelector('.search input').value;
 
    if (location == '')
        return;

    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=${APIKey}`).then(response => response.json()).then(json=>{

        if (json.cod=='404'){
            box.style.height='400px';
            info.classList.remove('active');
            details.classList.remove('active');
            error.classList.add('active');
            return
        }

        if(window.innerWidth>750)
            box.style.height='700px';
        else{
            box.style.height='500px'
        }
        info.classList.add('active');
        details.classList.add('active');
        error.classList.remove('active');
        
        const img=document.querySelector(".weather-box img");
        const temp=document.querySelector(".weather-box .temp");
        const desc=document.querySelector(".weather-box .desc");
        const nameofl=document.querySelector(".weather-box .nameofl")
        const humidity=document.querySelector(".details .humidity span");
        const wind=document.querySelector(".details .wind span");

        console.log(json)
        
        switch (json.weather[0].main) {
            case 'Clear':
                img.src="images/clear.png"
                break;
            case 'Rain':
                img.src="images/rain.webp"
                break;
            case 'Snow':
                img.src="images/sunny.png"
                break;
            case 'Haze':
                img.src="images/haze.png"
                break;
            case 'Mist':
                img.src="images/mist.png"
                break;
            case "Clouds":
                img.src="images/clouds.png"
                break;
            default:
                img.src="images/default.webp"
                break;
        }

        nameofl.innerHTML= `${json.name}`;
        temp.innerHTML=`${parseInt(json.main.temp)}<span>°C</span>`;
        desc.innerHTML=`${json.weather[0].description}`;
        humidity.innerHTML= `${json.main.humidity}%`
        wind.innerHTML= `${parseInt(json.wind.speed)}Km/h`

    });
         

});
