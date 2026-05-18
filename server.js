const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();

app.use(express.json());

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.post('/api/log', (req, res) => {
    let userIp = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
    
    if (userIp.includes('::ffff:')) {
        userIp = userIp.split('::ffff:')[1];
    }

    const { model, os } = req.body;
    const timestamp = new Date().toLocaleString();
    const logEntry = `[${timestamp}] IP: ${userIp} | Model: ${model} | OS: ${os}\n`;

    fs.appendFile(path.join(__dirname, 'visitors.log'), logEntry, (err) => {
        if (err) {
            console.error(err);
        }
    });

    res.sendStatus(200);
});

app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});