import { getUniquePrefixes } from "./helpers/chartPrefixes.js";
import { getGfsRunMetadata } from "./helpers/runMetaData.js";
import bodyParser from 'body-parser';
import express from 'express';
import cors from 'cors';


// Initialize the express app & set middleware
//////////////////////////////////////////////
const app = express();

app.use(bodyParser.json());
app.use(cors());


// Route to get all chart images
////////////////////////////////

app.get('/all', async (
    req,
    res
) => {
    const data = {
        eur: await getUniquePrefixes("eur"),
        meur: await getUniquePrefixes("meur"),
        gfsRunMetadata: await getGfsRunMetadata(),
    };

    res.send(data);
});


// Run the Restful service
//////////////////////////

const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});