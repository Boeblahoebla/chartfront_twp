/**
 * Function to fetch the GFS Metadata for the current run using Fetch API
 **/
export const fetchGFSData = async () => {
    try {
        const response = await fetch('http://localhost:3000/all');
        return await response.json();
    } catch (error) {
        console.error('Error fetching data:', error);
    }
};