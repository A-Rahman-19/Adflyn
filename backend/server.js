const express = require('express');

const app = express();
const PORT = 8000;

app.get('/health', (req, res) => {
    res.status(200).json({ status: 200, health: 'ok' });
});


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});