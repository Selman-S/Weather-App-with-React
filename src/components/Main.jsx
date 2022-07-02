import axios from "axios";
import { useState } from "react";
import WeatherCard from './WeatherCard'

const Main = () => {
    const [searchText,setSearchText]=useState("")
    const [data , setData] = useState([])
    const [error,setError] = useState("")

    const handleSubmit = (e) => {
      e.preventDefault();
      getWeatherDataFromApi();
      setSearchText('')
  }
  const handleChange = (e) => {
    setSearchText(e.target.value)
  };

  const getWeatherDataFromApi = async () => {
    let apiKey = process.env.REACT_APP_API_KEY;
    let units = "metric";
    let lang = "tr";
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${searchText}&appid=${apiKey}&units=${units}&lang=${lang}`;
    try {
      const response = await axios(url)
      const {id,main,name,sys,weather} = response.data
      let iconUrl = `https://openweathermap.org/img/wn/${weather[0].icon}@2x.png`;
      
      const isExist = data.some((card)=> card.id === id);
      if (isExist) {
        setError(`You already know the weather for ${name} :)`)
        setTimeout(() => setError(""), 3000);
      }
      else {
        //! array concat very important to show multiple data
        setData([{ id, main, name, sys, weather, iconUrl }, ...data]);
      }
      
      
    } catch (err) {
      setError(error.message);
      setTimeout(() => setError(""), 3000);
      console.log(error)
    }
  }
 
  
  return (
    <section className="main">
      <form onSubmit={handleSubmit}>
        <input 
        onChange={handleChange}
        type="text" placeholder="Search for a city"  autoFocus />
        <button type="submit">SUBMIT</button>
        <span className="msg"></span>
      </form>
      <div className="container">
        <ul className="cities">
          {
            data.map((item)=>(
              <WeatherCard key={item.id} {...item}/>
            ))
          }
        </ul>
      </div>
    </section>
  );
};

export default Main;