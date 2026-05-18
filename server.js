const express = require('express');
require('dotenv').config();

const connectDB = require('./connect');
const Visitor = require('./models/Vistor');

const path = require('path');

const app = express();
app.use(express.json());

const run = async () => {
    await connectDB();

    app.get('/', (req, res) => {
        res.sendFile(path.join(__dirname, 'index.html'));
    });

    app.post('/api/log', async (req, res) => {
        let userIp = req.headers['x-forwarded-for'] || req.socket.remoteAddress;

        if (userIp.includes('::ffff:')) {
            userIp = userIp.split('::ffff:')[1];
        }

        const { model, os } = req.body;
        const timestamp = new Date().toLocaleString();

        await Visitor.create({
            ip: userIp,
            model,
            os,
            timestamp
        });

        res.sendStatus(200);
    });

    app.listen(3000, () => {
        console.log("Server running");
    });
};

run();