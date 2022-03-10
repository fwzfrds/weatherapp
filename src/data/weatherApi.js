import axios from "axios";

const baseURL = 'https://api.openweathermap.org/data/2.5/weather?';
const apiKey = '3dbd947684f98c69aa1492d66b2b0e26';

export const getWeatherData = async (city) => {

    try {
        const { data } = await axios.get(baseURL + `q=${city}&appid=${apiKey}`);
        return data;
    } catch (error) {
        throw error;
    }

}