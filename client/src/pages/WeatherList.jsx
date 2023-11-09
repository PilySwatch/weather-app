import './WeatherList.css'

export default function WeatherList() {

  return (
    <div className="weather-list">
      <p>Here will go my weather list</p>
      <input placeholder="type a city"></input>
      <input placeholder="type a country"></input>
      <button>Search</button>
      <div className="card">
        <div className="top-elements">
          <div className="top-left">
            <h3>City, Country</h3>
            <h3>Time</h3>
          </div>
          <h2>Temperature</h2>
        </div>
        <div className="botton-elements">
          <h3>Description</h3>
          <div className="bottom-right">
            <h3>Hº: Max Temperature</h3>
            <h3>Lº: Min Temperature</h3>
          </div>
        </div>

      </div>

      


    </div>
  )

}