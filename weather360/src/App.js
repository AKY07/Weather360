import hotBg from "./assets/hot.jpg";
import coldBg from "./assets/cold.jpg";
import Descriptions from "./components/Descriptions";
import { useEffect, useState } from "react";
import { getFormattedWeatherData } from "./weatherService";
import SocialFollow from "./SocialFollow";

//CurrencyCalculator
import axios from "axios";
import CurrencyInput from "./CurrencyInput";
import Navbar from "./Navbar";
import "./App.css";

//CurrencyCalculator

function App() {
  //CurrencyCalculator
  const [amount1, setAmount1] = useState(1);
  const [amount2, setAmount2] = useState(1);
  const [currency1, setCurrency1] = useState("INR");
  const [currency2, setCurrency2] = useState("USD");
  const [rates, setRates] = useState([]);
 

  useEffect(() => {
    if (!!rates) {
      handleAmount1Change(1);
    }
  }, [rates]);
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
  function format(number) {
    return number.toFixed(4);
  }
  function handleAmount1Change(amount1) {
    setAmount2(format((amount1 * rates[currency2]) / rates[currency1]));
    setAmount1(amount1);
  }

  function handleCurrency1Change(currency1) {
    setAmount2(format((amount1 * rates[currency2]) / rates[currency1]));
    setCurrency1(currency1);
  }
  function handleAmount2Change(amount2) {
    setAmount1(format((amount2 * rates[currency1]) / rates[currency2]));
    setAmount2(amount2);
  }

  function handleCurrency2Change(currency2) {
    setAmount1(format((amount2 * rates[currency1]) / rates[currency2]));
    setCurrency2(currency2);
  }

  //Country Code Captail
let countryy={
  sydney:"Australia"
}
  let captail = {
    AUD: "sydney",
    BGN: "varna",
    BRL: "brasilia",
    CAD: "ottawa",
    CHF: "switzerland",
    CNY: "beijing",
    CZK: "prague",
    DKK: "copenhagen",
    EUR: "paris",
    GBP: "london",
    HKD: "hong kong",
    HRK: "croatia",
    HUF: "budapest",
    IDR: "jakarta",
    ILS: "jerusalem",
    INR: "delhi",
    ISK: "reykjavik",
    JPY: "tokyo",
    KRW: "seoul",
    MXN: "mexico city",
    MYR: "putrajaya",
    NOK: "oslo",
    NZD: "wellington",
    PHP: "manila",
    PLN: "warsaw",
    RON: "bucharest",
    RUB: "moscow",
    SEK: "stockholm",
    SGD: "singapore",
    THB: "bangkok",
    TRY: "ankara",
    USD: "washington",
    ZAR: "cape town",
  };

  // console.log(cityy)
  // let url1=`https://api.openweathermap.org/data/2.5/weather?q=${captail.AUD}&appid=8f1251b6c062fe2f8bcbb77302f5f50b&units=metric`
  // console.log(url1)

  // useEffect(() => {

  //   axios
  //     .get(
  //       // let cityyy=captail[currency2];
  //       // "http://data.fixer.io/api/latest?access_key=e385a9376f90e67c4aaf69fe088e1ae0&format=1"
  //       `https://api.openweathermap.org/data/2.5/weather?q=${captail[currency2]}&appid=8f1251b6c062fe2f8bcbb77302f5f50b&units=metric`
  //     )
  //     .then((response) => {
  //       setTemp(response.data.main.temp);

  //     });
  // }, []);
  // console.log(temps)

  // console.log(captail.a)
  // console.log(captail[currency2])
  // let cityy=captail[currency2];
  // const getFormattedTempWeatherData= async (cityy, units = "metric") => {
  //   const URL = `https://api.openweathermap.org/data/2.5/weather?q=${cityy}&appid=8f1251b6c062fe2f8bcbb77302f5f50b&units=metric&units=${units}`;
  //   const data = await fetch(URL)
  //     .then((res) => res.json())
  //     .then((data) => data);
  //   const {
  //     weather,
  //     main: { temp, feels_like, temp_min, temp_max, pressure, humidity },
  //     wind: { speed },
  //     sys: { country },
  //     name,
  //   } = data;
  //   const { description } = weather[0];
  //   return {
  //     description,
  //     // iconURL:makeIconURL(icon),
  //     temp,
  //     feels_like,
  //     temp_min,
  //     temp_max,
  //     pressure,
  //     humidity,
  //     speed,
  //     country,
  //     name,
  //   };
  // };

  //CurrencyCalculator

  const [city, setCity] = useState("delhi");
  const [weather, setWeather] = useState(null);
  const [units, setUnits] = useState("metric");
  const [bg, setBg] = useState(hotBg);
  const [temps, setTemp] = useState(0);
  const [tempss,setTemps]=useState(0);

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

  useEffect(() => {
    const fetchWeatherData1 = async () => {
      const data = await getFormattedWeatherData(captail[currency2], units);
      setTemp(data);

      //dynamic bg
      // const threshold = units === "metric" ? 20 : 60;
      // if (data.temp <= threshold) setBg(coldBg);
      // else setBg(hotBg);
    };
    fetchWeatherData1();
  }, [units, captail[currency2]]);

  useEffect(() => {
    const fetchWeatherData2 = async () => {
      const data = await getFormattedWeatherData(captail[currency1], units);
      setTemps(data);

      //dynamic bg
      // const threshold = units === "metric" ? 20 : 60;
      // if (data.temp <= threshold) setBg(coldBg);
      // else setBg(hotBg);
    };
    fetchWeatherData2();
  }, [units, captail[currency1]]);

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
    <>
      <Navbar />
      {/* <div className="app" style={{ backgroundImage: `url(${bg})` }}> */}

      <div className="app">
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
      </div>
      <div className="topdiv">
        <div className="air air1"></div>
        <div className="air air2"></div>
        <div className="air air3"></div>
        <div className="air air4"></div>
      </div>
      {/* CurrencyCalculator */}

      <div className="currencyDiv">
        <h1 className="currencyH1">Currency Converter</h1>
        <p className="currencyP">
          <strong>Check live foreign currency exchange rates</strong>{" "}
        </p>

        <div className="divTempss">
          <div className="divT1">
          {tempss && <h3>{`${tempss.name},${tempss.country}`}</h3> 
       }
       {tempss && <div>
                  <h1>{`${tempss.temp.toFixed()}°${
                    units === "metric" ? "C" : "F"
                  } `}</h1>
                </div>}
                
       </div>
<div className="divCu">
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
        {/* {temps} */}
        <div className="divT2">
       {temps && <h3>{`${temps.name},${temps.country}`}</h3> 
       }
       {temps && <div>
                  <h1>{`${temps.temp.toFixed()}°${
                    units === "metric" ? "C" : "F"
                  } `}</h1>
                </div>}
                </div>

                </div>
        {/* CurrencyCalculator */}
      </div>
      <SocialFollow />
    </>
  );
}

export default App;
