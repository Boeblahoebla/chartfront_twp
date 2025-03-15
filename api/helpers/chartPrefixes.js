import path from "path";
import fs from "fs/promises";

/**
 * Function to extract unique prefixes for all charts
 * **/
export const getUniquePrefixes = async (dir) => {
    try {
        // Resolve the correct path outside of /api/
        const dirPath = path.resolve("../src/images", dir);
        const files = await fs.readdir(dirPath);

        console.log("All Files:", files);

        const prefixes = new Set();

        files.forEach(file => {
            // New regex: Captures everything BEFORE the region (_eur/_meur)
            const match = file.match(/^([a-zA-Z0-9_]+)_(eur|meur)_f\d{3}\.png$/);

            if (match) {
                console.log(`Matched: ${file} -> ${match[1]}`);
                prefixes.add(match[1]); // Capture the unique prefix
            } else {
                console.log(`No Match: ${file}`);
            }
        });

        console.log("Extracted Prefixes:", Array.from(prefixes));

        return Array.from(prefixes);
    } catch (error) {
        console.error(`Error reading directory ${dir}:`, error);
        return [];
    }
};