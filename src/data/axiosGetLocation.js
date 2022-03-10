import axios from "axios";

export const axiosGetLocation = async (url) => {

    return await axios({
        url: url,
        method: 'get',
        timeout: 8000,
        headers: {
            'Content-Type': 'application/json',
        }
    })
}