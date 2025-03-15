import path from "path";
import fs from "fs/promises";

/**
 * Function to read in the GFS Run metadata
 * **/
export const getGfsRunMetadata = async () => {
    try {
        const jsonPath = path.resolve("../src/images/gfs_run_metadata.json");
        const data = await fs.readFile(jsonPath, "utf8");
        return JSON.parse(data); // Convert string to JSON
    } catch (error) {
        console.error("Error reading JSON file:", error);
        return {}; // Return empty object on failure
    }
};
