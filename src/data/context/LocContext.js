import React, { createContext, useState, useEffect } from 'react';
import { axiosGetLocation } from '../axiosGetLocation';

export const LocContext = createContext();

const LocContextProvider = (props) => {
    const [latitude, setLatitude] = useState(null);
    const [longitude, setLongitude] = useState(null);
    const [location, setLocation] = useState(null);

    useEffect(() => {

        const getCoords = () => {
            navigator.geolocation.getCurrentPosition(function (position) {
                setLatitude(position.coords.latitude);
                setLongitude(position.coords.longitude);
            });
        }

        getCoords();

    }, []);

    console.log(latitude, longitude);

    useEffect(() => {

        const API_Key = `87967ec7b15ef61c8786837a37986897`;
        const base_URL = `http://api.positionstack.com/v1/reverse?access_`

        if (latitude !== null && longitude !== null) {

            const getLocation = async () => {
                try {
                    let res = await axiosGetLocation(`${base_URL}key=${API_Key}&query=${latitude},${longitude}`)

                    if (res.data.data[0].locality) {
                        setLocation(res.data.data[0].locality);
                    }

                    return res.data.data[0].locality;
                }
                catch (error) {
                    console.error(error.message);
                }
            }

            getLocation();

        }

    }, [latitude, longitude]);

    return (
        <LocContext.Provider value={{ location }}>
            {props.children}
        </LocContext.Provider>
    );
}

export default LocContextProvider;