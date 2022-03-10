import React, { useEffect, useState, useContext } from 'react';
import { getWeatherData } from '../data/weatherApi';
import { ScaleLoader } from 'react-spinners';
import { LocContext } from '../data/context/LocContext';

const Weather = () => {

    const [city, setCity] = useState('');
    const [cityInput, setCityInput] = useState('');
    const [weatherData, setWeatherData] = useState(null);

    const [loading, setLoading] = useState(false);

    const { location, latitude, longitude } = useContext(LocContext);
    console.log(location);

    useEffect(() => {
        setCity(location);
    }, [latitude, longitude, location]);

    const getData = async () => {
        try {
            setLoading(true);
            const data = await getWeatherData(city);
            setWeatherData(data);
            console.log(data);
            setLoading(false);
        } catch (error) {
            console.log(error.message);
            setLoading(false);
        }
    }

    const override = `
        display: block;
        margin: 0 auto;
        border-color: red;
    `;

    useEffect(() => {
        if (city !== '')
            getData();
    }, [city])

    const handleSubmit = (e) => {
        e.preventDefault();

        setCity(cityInput);
    }

    console.log(city);

    return (
        <div className='card'>
            <h2 className='title'><i className='fa fa-cloud'>Weather App</i></h2>
            <form className='search-form' onSubmit={handleSubmit}>
                <input type='text' placeholder='Enter your city name'
                    value={cityInput}
                    onFocus={() => setCity(() => "")}
                    onChange={(e) => setCityInput(e.target.value)}
                />
                <button type='submit'>Search</button>
            </form>
            {loading ? (
                <div className='loader-container'>
                    <ScaleLoader
                        css={override}
                        size={200}
                        color={'#fff'}
                        loading={loading}
                    />
                </div>
            ) : (
                <>
                    {weatherData !== null ? (
                        <div className='main-container'>
                            <h4>Live Weather Condition</h4>
                            <div className='weather-icon'>
                                <img src={`http://openweathermap.org/img/w/${weatherData.weather[0].icon}.png`} alt={weatherData.weather[0].main} />
                            </div>
                            <h3>{weatherData.weather[0].main}</h3>
                            <div className='temp'>
                                <h1>{parseFloat(weatherData.main.temp - 273.15).toFixed(1)}&deg;C</h1>
                            </div>
                            <div className='location'>
                                <h3><i className='fa fa-street-view'></i>{weatherData.name} | {weatherData.sys.country}</h3>
                            </div>
                            <div className='temp-range'>
                                <h6>Min: {parseFloat(weatherData.main.temp_min - 273.15).toFixed(1)}&deg;C ||
                                    Max: {parseFloat(weatherData.main.temp_max - 273.15).toFixed(1)}&deg;C ||
                                    Humidity: {parseFloat(weatherData.main.humidity)}%
                                </h6>
                            </div>
                        </div>
                    ) : null}
                </>
            )}
        </div>
    )
}

export default Weather;