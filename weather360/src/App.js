import hotBg from "./assets/hot.jpg";
import coldBg from "./assets/cold.jpg";
import Descriptions from "./components/Descriptions";
import { useEffect, useState } from "react";
import { getFormattedWeatherData } from "./weatherService";

//CurrencyCalculator
import axios from "axios";
import CurrencyInput from "./CurrencyInput";    
import "./App.css";
//CurrencyCalculator



function App() {
//CurrencyCalculator
const [amount1, setAmount1] = useState(1);
const [amount2, setAmount2] = useState(1);
const [currency1, setCurrency1] = useState("INR");
const [currency2, setCurrency2] = useState("USD");
const [rates, setRates] = useState([]);
useEffect(()=>{
 if(!!rates){
  handleAmount1Change(1);
 }
},[rates])
useEffect(() => {
  axios
    .get(
      // "http://data.fixer.io/api/latest?access_key=e385a9376f90e67c4aaf69fe088e1ae0&format=1"
      "https://api.freecurrencyapi.com/v1/latest?apikey=IMiGvKNQNflo9HKlJBFDfiD02qxe8hWRKbPpM29L"
    )
    .then((response) => {
      setRates(response.data.data);
    });
}, []);
function format(number){
 return  number.toFixed(4);
} 
function handleAmount1Change(amount1){
  setAmount2(format(amount1 * rates[currency2] / rates[currency1]));
  setAmount1(amount1);
}
 
function handleCurrency1Change(currency1){
  setAmount2(format(amount1 * rates[currency2] / rates[currency1]));
  setCurrency1(currency1)
}
function handleAmount2Change(amount2){
  setAmount1(format(amount2 * rates[currency1] / rates[currency2]));
  setAmount2(amount2);
}
 
function handleCurrency2Change(currency2){
  setAmount1(format(amount2 * rates[currency1] / rates[currency2]));
  setCurrency2(currency2)
}
      

//CurrencyCalculator





  const [city, setCity] = useState("paris");
  const [weather, setWeather] = useState(null);
  const [units, setUnits] = useState("metric");
  const [bg, setBg] = useState(hotBg);

  useEffect(() => {
    const fetchWeatherData = async () => {
      const data = await getFormattedWeatherData(city, units);
      setWeather(data);

      //dynamic bg
      const threshold = units === "metric" ? 20 : 60;
      if (data.temp <= threshold) setBg(coldBg);
      else setBg(hotBg);
    };
    fetchWeatherData();
  }, [units, city]);

  const handleUnitsClick = (e) => {
    const button = e.currentTarget;
    const currentUnit = button.innerText.slice(1);
    const isCelcius = currentUnit === "C";
    button.innerText = isCelcius ? "°F" : "°C";
    setUnits(isCelcius ? "metric" : "imperial");
  };
  const enterKeyPressed = (e) => {
    if (e.keyCode === 13) {
      setCity(e.currentTarget.value);
      e.currentTarget.blur();
    }
  };

  return (
    <div className="app" style={{ backgroundImage: `url(${bg})` }}>
      <div className="overlay">
        {weather && (
          <div className="container">
            <div className="section section__inputs">
              <input
                onKeyDown={enterKeyPressed}
                type="text"
                name="city"
                placeholder="Enter City..."
              />
              <button onClick={(e) => handleUnitsClick(e)}>°F</button>
            </div>
            <div className="section section__temperature">
              <div className="icon">
                <h3>{`${weather.name},${weather.country}`}</h3>
                <img src={weather.iconURL} alt="weatherIcon" />
                <h3>{weather.description}</h3>
              </div>
              <div className="temperature">
                <h1>{`${weather.temp.toFixed()}°${
                  units === "metric" ? "C" : "F"
                } `}</h1>
              </div>
            </div>
            {/* bottom description */}
            <Descriptions weather={weather} units={units} />
          </div>
        )}
      </div>
      {/* CurrencyCalculator */}

      <div className="currencyDiv">
      <h1 className="currencyH1">Currency Converter</h1>
      <p className="currencyP"><strong>Check live foreign currency exchange rates</strong> </p>
      <CurrencyInput
      onAmountChange={handleAmount1Change}
      onCurrencyChange={handleCurrency1Change}
        currencies={Object.keys(rates)}
        amount={amount1}
        currency={currency1}
      />
      <CurrencyInput
      onAmountChange={handleAmount2Change}
      onCurrencyChange={handleCurrency2Change}
     
        currencies={Object.keys(rates)}
        amount={amount2}
        currency={currency2}
      />
    </div>

      {/* CurrencyCalculator */}
    </div>
  );
}

export default App;
