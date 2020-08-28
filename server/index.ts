import compression from 'compression';
import cors from 'cors';
import dotenv from 'dotenv';
import express, { Express, Response } from 'express';
import path from 'path';
import connectDB from './database/init';
//  routes
import CodeRoute from './routes/code.route';
import SnippetRoute from './routes/snippet.route';

// env variable config
if (process.env.NODE_ENV !== 'production') {
    dotenv.config();
}

// exporess settings
const app: Express = express();
app.set('env', process.env.NODE_ENV);

// db
connectDB();

// handle post request
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true, limit: '50mb' }));
app.use(compression());

//routes
app.use('/api/code', CodeRoute);
app.use('/api/snippets', SnippetRoute);

// Serve static addes in prod env
if (process.env.NODE_ENV === 'production') {
    // Set static folder
    app.use('/', express.static(path.join(__dirname, 'client')));

    // index.html for all page routes
    app.get('*', (_, res: Response): void => {
        res.sendFile(path.resolve(__dirname, 'client', 'index.html'));
    });
}

const hostname = 'localhost';
const PORT = process.env.PORT || 5000;

const handleListening = () => console.log(`✅  Listening on: http://${hostname}:${PORT}`);

app.listen(PORT, handleListening);