import { useState, React, useEffect } from "react";
import Nav from "./Nav.js";
import ReactLoading from "react-loading";

function Home() {
  const [query, setquery] = useState("New%20York");
  const [error, seterror] = useState(false);

  

  const api = {
    base: "api.weatherstack.com/",
    key: "29b0c36533e2d882c2f336231dff94d3",
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
      `http://${api.base}current?access_key=${api.key}&query=${query}`,
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
        wimg: fetchweather.current.weather_icons,
        name: fetchweather.location.name,
        region: fetchweather.location.region,
        country: fetchweather.location.country,
        temperature: fetchweather.current.temperature,
        wind_speed: fetchweather.current.wind_speed,
        humidity: fetchweather.current.humidity,
        localtime: fetchweather.location.localtime,
        weather_descriptions: fetchweather.current.weather_descriptions,
      });
    }
    setquery("");
  };
 
  if(query==="New%20York"){
 
    console.log("object")
     const submit = async () => {
  
    const fetchweather = await fetch(
      `http://${api.base}current?access_key=${api.key}&query=${query}`,
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
          wimg: fetchweather.current.weather_icons,
          name: fetchweather.location.name,
          region: fetchweather.location.region,
          country: fetchweather.location.country,
          temperature: fetchweather.current.temperature,
          wind_speed: fetchweather.current.wind_speed,
          humidity: fetchweather.current.humidity,
          localtime: fetchweather.location.localtime,
          weather_descriptions: fetchweather.current.weather_descriptions,
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
          <ReactLoading type={"spin"} color={"blue"} height={300} width={300} />
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
              src={displayData.wimg}
              className=" absolute -z-10 opacity-10 w-screen h-screen "
            ></img>
          </div>
          

          <div className="font-medium font-sans mt-10">
            <div className="flex justify-center text-center m-2 p-2">
              {" "}
              {displayData.name}{" "}
              {displayData.country}{" "}
            </div>
            <div className="flex justify-center content-center text-center m-2 p-2">
              <span className="text-8xl font-normal">{displayData.temperature}</span> °C
            </div>
            <div className="flex justify-center content-center m-2 p-2">
             {displayData.localtime}
            </div>
            <div className="flex-col text-center m-2 p-2">
                <div className="m-2">{displayData.weather_descriptions}</div>
              </div>
            <div className="flex justify-center content-center">

              <div className="flex-col text-center m-2 p-2">
                <div className="m-2">Wind Speed</div>
                <div className="m-2">{displayData.wind_speed}</div>
              </div>
              <div className="flex-col text-center m-2 p-2">
                <div className="m-2">Humidity</div>
                <div className="m-2">{displayData.humidity}</div>
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
