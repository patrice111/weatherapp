/* Global Variables */

// Create a new date instance dynamically with JS
let d = new Date();
//let newDate = d.getMonth()+'.'+ d.getDate()+'.'+ d.getFullYear();


//API KEY for OpenWeatherMap API
const apiKey = '&appid=f2f9b5823c3ff5bb4403e7a47adc9946';
const baseURL = 'https://api.openweathermap.org/data/2.5/weather?zip=';


// Event listener to add function to existing HTML DOM element
document.getElementById('generate').addEventListener('click', onGenerate);

//Function call by event listener
function onGenerate(e){
const zipCode = document.getElementById('zip').value;  
const feelings = document.getElementById('feelings').value;
getWeather(baseURL,zipCode,apiKey)
  .then(function(data){
      //Adding data to POST request
      console.log(data);
      postData('http://localhost:8000/add', {
          date: d,
          temperature: data.main.temp,
          content: feelings,
      })
  })
  .then(function() {
      updateUI()
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
    const request = await fetch ('http://localhost:8000/all');
    try{
        const allData = await request.json();
        document.getElementById('date').innerHTML = `Date: ${allData.date}`;
        document.getElementById('temp').innerHTML = `Tempurature: ${allData.temp}`;
        document.getElementById('content').innerHTML = `I feel: ${allData.content}`;
    }catch(error){
        console.log("error", error);
    }
}

