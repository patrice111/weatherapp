/* Global Variables */

// Create a new date instance dynamically with JS
let d = new Date();
//let newDate = d.getMonth()+'.'+ d.getDate()+'.'+ d.getFullYear();


//API KEY for OpenWeatherMap API
const apiKey = '&appid=f2f9b5823c3ff5bb4403e7a47adc9946';
const baseURL = 'https://api.openweathermap.org/data/2.5/weather?zip=';
let apiURL =
    "http://api.openweathermap.org/data/2.5/weather?zip=&appid=f2f9b5823c3ff5bb4403e7a47adc9946";
console.log(apiURL);

// Event listener to add function to existing HTML DOM element
document.getElementById('generate').addEventListener('click', onGenerate);

//Function call by event listener
function onGenerate(e){
const zipCode = document.getElementById('zip').value;  
const feelings = document.getElementById('feelings').value;
getWeather(baseURL,zipCode,apiKey)

    .then(function(data){
        console.log(data);

        postData('/add', {
            date: d,
            temperature: data.main.temp,
            content: feelings,
        });
        updateUI();
    });
}

//Function to get web api data
const getWeather = async (baseURL, zip, key) => {
    const response = await fetch (baseURL+zip+key)
    try{
        const data = await response.json();
        return data;
    }catch(error){
        console.log("error", error);
    }
}

//Function to post data
const postData = async (url = '', data ={}) => {
    console.log(data);
    const response = await fetch(url, {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json',
        },

        body: JSON.stringify(data)
    });

    try{
        const newData = await response.json();
        console.log(newData);
        return newData;
    }catch(error){
        console.log("error", error);
    }
}

//function to get project data
const updateUI = async() => {
    const request = await fetch ('/all');
    try{
        const allData = await request.json();
        document.getElementById('date').innerHTML = `Date: ${allData[0].date}`;
        document.getElementById('temp').innerHTML = `Tempurature: ${allData[0].temp}`;
        document.getElementById('content').innerHTML = `I feel: ${allData[0].content}`;
    }catch(error){
        console.log("error", error);
    }
}