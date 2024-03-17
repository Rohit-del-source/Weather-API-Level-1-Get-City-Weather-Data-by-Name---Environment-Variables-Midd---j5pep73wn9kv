const fs = require('fs');

async function getDataFromDatabase() {
  return new Promise((resolve, reject) => {
    fs.readFile('src/data/data.json', (err, data) => {
      if (err) {
        reject(err);
      } else {
        resolve(JSON.parse(data));
      }
    });
  });
}

async function saveDataToDatabase(data) {
  return new Promise((resolve, reject) => {
    const jsonData = JSON.stringify(data);
    fs.writeFile('src/data/data.json', jsonData, (err) => {
      if (err) {
        reject(err);
      } else {
        resolve();
      }
    });
  });
}

// Level 1: Get City Weather Data by Name
async function getWeatherDataByName(cityName) {
   console.log("city in controller", cityName); //here we got the city name
   try{
    const cityData = await getDataFromDatabase();
    const weatherData = cityData.find((el)=> el.city.toLowerCase() === cityName.toLowerCase());
    console.log(weatherData);
    return weatherData.weather
   }catch(err){
    console.log(err);
    throw new Error("City not found");
   }
}


module.exports = {
  getWeatherDataByName
};