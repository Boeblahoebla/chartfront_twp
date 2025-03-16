/**
 * Function to fetch the GFS Metadata for the current run using Fetch API
 **/
export const fetchGFSData = async () => {
    try {
        const response = await fetch('http://localhost:3000/all');
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return await response.json(); // ✅ Fetch returns a Response object, so we need to parse JSON manually
    } catch (error) {
        console.error('Error fetching data:', error);
    }
};