import { useState, React, useEffect } from "react";
import Nav from "./Nav.js";
import ReactLoading from "react-loading";
import Moment from 'react-moment';

function Home() {
  const [query, setquery] = useState("New%20York");
  const [error, seterror] = useState(false);
  const regionNames = new Intl.DisplayNames(
    ['en'], {type: 'region'}
  );
  

  const api = {
    
    base: "https://api.openweathermap.org/",
    key: "fe4feefa8543e06d4f3c66d92c61b69c",
  };

  const [displayData, setdisplayData] = useState({
    wimg: "",
    name: "",
    region: "",
    country: "",
    temperature: "",
    localtime: "",
    weather_descriptions: "",
    wind_speed: "",
    humidity: "",
  });

  const [isfetching, setisfetching] = useState(false);
  const [isfetching2, setisfetching2] = useState(true);

  const handlesubmit = async (e) => {
    e.preventDefault();

    setisfetching(true);
    setisfetching2(false);
    const fetchweather = await fetch(
      `${api.base}data/2.5/weather?q=${query}&appid=${api.key}`,
      { force: true, mode: "cors" }
    )
      .then((res) => res.json())
      .then((data) => {
        return data;
      });

    setisfetching(false);
    setisfetching2(true);

    if (fetchweather.success === false) {
      alert(fetchweather.error.info);
      window.location.href = "/";
    } else if (Object.keys(fetchweather).length === 0) {
      alert("Try Again");
    } else {
      setdisplayData({
        name: fetchweather.name,
        wimg: fetchweather.weather[0].icon,
        country: fetchweather.sys.country,
        temperature: fetchweather.main.temp,
        wind_speed: fetchweather.wind.speed,
        humidity: fetchweather.main.humidity,
        localtime: fetchweather.dt,
        weather_descriptions: fetchweather.weather[0].description,
      });
    }
    setquery("");
  };
 
  if(query==="New%20York"){
 
    
     const submit = async () => {
  
    const fetchweather = await fetch(
      `${api.base}data/2.5/weather?q=${query}&appid=${api.key}`,
      { force: true, mode: "cors" }
    )
      .then((res) => res.json())
      .then((data) => {
        return data;
      });
   

      if (fetchweather.success === false) {
        alert(fetchweather.error.info);
       seterror(true)
       setisfetching2(false);
      } else if (Object.keys(fetchweather).length === 0) {
        alert("Try Again");
      } else {
        setdisplayData({
          
          name: fetchweather.name,
          wimg: fetchweather.weather[0].icon,
          country: fetchweather.sys.country,
          temperature: fetchweather.main.temp,
          wind_speed: fetchweather.wind.speed,
          humidity: fetchweather.main.humidity,
          localtime: fetchweather.dt,
          weather_descriptions: fetchweather.weather[0].description,
        });

      }
  
    setquery("");
  };


  submit()

  }

  return (
    <>
      <Nav />
     {error &&
    
 <div className="absolute justify-center text-center  h-screen w-screen content-center items-center mt-10">
         <div className="flex justify-center">
          <ReactLoading type={"bars"} color={"blue"} height={200} width={200} />
          </div>
<div className="flex justify-center text-center text-2xl">
          Sorry For Inconvenience !! Visit After Some Time
          </div>
        </div>


  
     
     
     }
      

      {isfetching && 
        <div className="absolute flex justify-center text-center text-5xl h-screen w-screen content-center items-center">
          <ReactLoading type={"spin"} color={"blue"} height={200} width={200} />
        </div>
      }
      {isfetching2 && 
      <div className="">

<form className="flex justify-center items-center content-center m-4 p-2 ">
<input
  type="text"
  onChange={(e) => setquery(e.target.value)}
  name="searchbar"
  
  placeholder="Search For Weather"
  className=" border-blue-500 border-2 p-2 pl-4 pr-4 text-md rounded-sm"
/>
<button

  onClick={handlesubmit}
  className="  pt-1 pb-1 p-2 cursor-pointer border-black border-2 rounded-sm m-2 text-sm hover:bg-blue-300"
>search</button>
</form>
        <div className="text-2xl justify-center h-screen  items-center ">
          <div className="flex justify-center">
            <img
              src={`http://openweathermap.org/img/w/${displayData.wimg}.png`}
              className=" absolute -z-10 opacity-20 w-screen h-screen  "
            ></img>
          </div>
          

          <div className="font-medium font-sans mt-10">
            <div className="flex justify-center text-center m-2 p-2">
              {" "}
              {displayData.name}{" "}
              {regionNames.of( displayData.country)}{" "}
            </div>
            <div className="flex justify-center content-center text-center m-2 p-2">
              <span className="text-8xl font-normal">{(displayData.temperature -273.15).toFixed(2)}</span> °C
            </div>
            <div className="flex justify-center content-center m-2 p-2">
            <Moment unix>{displayData.localtime}</Moment>
            </div>
            <div className="flex-col text-center m-2 p-2">
                <div className="m-2">{displayData.weather_descriptions}</div>
              </div>
            <div className="flex justify-center content-center">

              <div className="flex-col text-center m-2 p-2">
                <div className="m-2">Wind Speed</div>
                <div className="m-2">{displayData.wind_speed} m/s</div>
              </div>
              <div className="flex-col text-center m-2 p-2">
                <div className="m-2">Humidity</div>
                <div className="m-2">{displayData.humidity} %</div>
              </div>
            </div>
          </div>
        </div>
        </div>
      }
    </>
  );
}
export default Home;
