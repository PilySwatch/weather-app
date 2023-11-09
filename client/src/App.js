import './App.css';
import { BrowserRouter, Routes, Route, Link, NavLink } from 'react-router-dom';

// Pages
import MyLocation from './pages/MyLocation';
import WeatherList from './pages/WeatherList';
import CurrentWeather from './pages/CurrentWeather';


function App() {
  return (
    <BrowserRouter>
    <div className='App'>
      <header>
        <nav>
          <h1>NimbusCast</h1>
          <div className='nav-items'>
            <NavLink to="/" className='myLocation'>My Location</NavLink>
            <NavLink to="weather-list">WeatherList</NavLink>
          </div>
        </nav>
      </header>
      <main>
        <Routes>
          <Route index element={<MyLocation />} />
          <Route path="weather-list" element={<WeatherList />} />
          <Route path="current-weather" element={<CurrentWeather />} />
        </Routes>
      </main>
    </div>
    </BrowserRouter>
  );
}

export default App;
