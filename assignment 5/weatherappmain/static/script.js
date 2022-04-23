const wrapper = document.querySelector(".wrapper"),
    inputPart = wrapper.querySelector(".input-part"),
    infoTxt = inputPart.querySelector(".info-txt"),
    inputField = inputPart.querySelector("input"),
    locationBtn = inputPart.querySelector("button"),
    wIcon = wrapper.querySelector(".weather-part img"),
    arrowBack = wrapper.querySelector("header i");
let api;

inputField.addEventListener("keyup", e => {
    // if user prs enter and input val isn't empty
    if (e.key == "Enter" && inputField.value != "") {
        console.log("hellom");
        RequestApi(inputField.value);
    }
})

locationBtn.addEventListener("click", () => {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(onSuccess, onError)

    } else {
        alert("browser not support geolocation api");
    }

});
function onSuccess(position) {
    const { latitude, longitude } = position.coords;   //getting coordinates of location langitude n latitude
    api = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=55aa21a9d67804c7aff1a2824bda78c3`;
    fetchData();
}
function onError(error) {
    infoTxt.innerText = error.message;
    infoTxt.classList.add("error");
}

function RequestApi(city) {
    api = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=55aa21a9d67804c7aff1a2824bda78c3`
    fetchData();

}

function fetchData() {
    infoTxt.innerText = "Getting weather details...";
    infoTxt.classList.add("pending");

    fetch(api).then(response => response.json()).then(result => weatherDetails(result));
}

function weatherDetails(info) {
    if(info.cod == "404"){
        infoTxt.classList.replace("pending","error");
        infoTxt.innerText = `${inputField.value} isn't valid city name`;
    }else{
        const city = info.name;
        const country = info.sys.country;
        const {description,id} = info.weather[0];
        const {feels_like,humidity,temp} = info.main;

        if(id==800){
            wIcon.src = "../static/Icons/clear.svg";
        }else if(id>= 200 && id<= 232){
            wIcon.src = "../static/Icons/storm.avg";
        }else if(id>=600 && id<=622){
            wIcon.src = "../static/Icons/snow.svg";
        }else if(id>=701 && id <= 781){
            wIcon.src = "../static/Icons/haze.svg";
        }else if(id>= 801 && id<= 804){
            wIcon.src = "../static/Icons/cloud.svg";
        }else if((id >= 300 && id<= 321) || (id>=500 && id<=531)){
            wIcon.src = "../static/Icons/rain.svg";
        }

        wrapper.querySelector(".temp .numb").innerText = Math.floor(temp);
        wrapper.querySelector(".weather").innerText = description;
        wrapper.querySelector(".location span").innerText = `${city}, ${country}`;
        wrapper.querySelector(".temp .numb-2").innerText = Math.floor(feels_like);
        wrapper.querySelector(".humidity span").innerText = `${humidity}%` ;

        infoTxt.classList.remove("pending","error");
        wrapper.classList.add("active");
        console.log(info);
    }
}

arrowBack.addEventListener("click",()=>{
    wrapper.classList.remove("active");
})