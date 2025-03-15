import axios from "axios";

/**
 * Function to fetch the GFS Metadata for the current run
 * **/
export const fetchGFSData = async () => {
    try {
        const res = await axios.get('http://localhost:3000/all');
        return res.data

    } catch (error) {
        console.error('Error fetching data:', error);
    }

}