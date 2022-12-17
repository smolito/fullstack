import { useState, useEffect } from "react";
import axios from "axios";

const CountryDetail = ({ country }) => {
  //https://api.openweathermap.org/data/2.5/weather?q={city name}&appid={API key}
  //console.log(`https://api.openweathermap.org/data/2.5/weather?q=${country.capital}&appid=${api_key}`);

  //const [cityWeather, setWeather] = useState([]);
  const [capitalTemp, setCapitalTemp] = useState(0);
  const [capitalWindSpeed, setCapitalWindSpeed] = useState(0);
  const [weatherIcon, setIcon] = useState("");
  const [weatherAlt, setAlt] = useState("");

  const api_key = process.env.REACT_APP_API_KEY;

  useEffect(() => {
    //console.log("weather effect");
    axios
      .get(
        `https://api.openweathermap.org/data/2.5/weather?q=${country.capital}&appid=${api_key}`
      )
      .then((response) => {
        //console.log("weather promise fulfilled");
        setCapitalTemp(response.data.main.temp);
        setCapitalWindSpeed(response.data.wind.speed);
        setIcon(response.data.weather[0].icon);
        setAlt(response.data.weather[0].main);
      });
  }, [country, api_key]);

  const getLangs = (languagesObject) => {
    let langs = [];

    for (const key in languagesObject) {
      if (Object.hasOwnProperty.call(languagesObject, key)) {
        const lang = languagesObject[key];
        langs = langs.concat(lang);
      }
    }
    return langs;
  };

  const kelvintoCelsius = (kelvin) => {
    return (kelvin - 273.15).toFixed(2);
  };

  return (
    <div>
      <div>
        <h3>{country.name.common}</h3>
        <h4>{country.name.official}</h4>
        <ul>
          <div>region: {country.region}</div>
          <div>capital: {country.capital}</div>
          <div>area: {country.area}</div>
          <div>population: {country.population}</div>
        </ul>
      </div>
      <div>
        <h5>languages spoken</h5>
        <div>
          <ul>
            {getLangs(country.languages).map((l) => (
              <li key={l}>{l}</li>
            ))}
          </ul>
        </div>
      </div>
      <div>
        <img src={country.flags.png} alt="flag of the country"></img>
      </div>
      <div>
        <h4>Weather in {country.capital}</h4>
        <img
          src={`http://openweathermap.org/img/wn/${weatherIcon}@4x.png`}
          alt={weatherAlt}
        ></img>
        <div>temperature: {kelvintoCelsius(capitalTemp)} °C</div>
        <div>winter speed: {capitalWindSpeed} wind m/s </div>
      </div>
    </div>
  );
};

export default CountryDetail;
