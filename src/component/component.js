import { useState, useEffect } from "react";
import "./component.css";
import axios from 'axios';

export default function Component() {
    const [data, setData] = useState(null);
    const [city, setCity] = useState("");
    const [loading, setLoading] = useState(false);

    const fetchWeatherData = async (cityName) => {
        setLoading(true);
        try {
            const apiKey = "2e3bbea361734a26a6781603242207";
            const url = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${cityName}`;
            const response = await axios.get(url);
            console.log(response.data);
            setData(response.data);
        } catch (error) {
            window.alert('Failed to fetch weather data');
            console.error('Error fetching weather data:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchWeatherData("London");
    }, []);

    const handleSearch = () => {
        fetchWeatherData(city);
    };

    return (
        <>

            <input
                type="text"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                placeholder="Enter city name"
            />
            <button onClick={handleSearch}>Search</button>
            {loading && (
                <p>Loading data... </p>
            )}
            {!loading && (
                <div className="weather-cards">
                    {data && data.current && (
                        <>
                            <div className="weather-card">
                                <div className="weather-icon">
                                    <img src={data.current.condition.icon} alt={data.current.condition.text} />
                                </div>
                                <div className="weather-info">
                                    <h2 className="temperature">{data.current.temp_c}°C</h2>
                                </div>
                            </div>
                            <div className="weather-card">
                                <div className="weather-info">
                                    <h2 className="humidity">Humidity</h2>
                                    <p>{data.current.humidity}%</p>
                                </div>
                            </div>
                            <div className="weather-card">
                                <div className="weather-info">
                                    <h2 className="wind-speed">Wind Speed</h2>
                                    <p>{data.current.wind_kph} kph</p>
                                </div>
                            </div>
                            <div className="weather-card">
                                <div className="weather-info">
                                    <h2 className="wind-speed">condition</h2>
                                    <p>{data.current.condition.text} kph</p>
                                </div>
                            </div>
                        </>
                    )}
                </div>
            )}
        </>
    );
}
