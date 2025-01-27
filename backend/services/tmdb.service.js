import axios from "axios";
import { ENV_VARS } from "../config/envVars.js";


export const fetchTmdb = async (url) => {
    try {
        const options = {
            method: 'GET',
            headers: {
                accept: 'application/json',
                Authorization: 'Bearer ' + ENV_VARS.TMDB_API_KEY
            }
        };

        const response = await axios.get(url, options);
        console.log(response.data);
        return response.data;
    } catch (error) {
        console.error(error);
    }

}
