import express from 'express';
import http from 'http';
import mongoose from 'mongoose';
import { config } from './config/config';
import Logging from './library/Logging';
import policeRoutes from './routes/Police';
import stationRoutes from './routes/Stations';
import swaggerui from 'swagger-ui-express';
//import swaggerDocument from './swagger.json'

const router = express();

/**Connect to mongo */

mongoose
    .connect(config.mongo.url, { retryWrites: true, w: 'majority' })
    .then(() => {
        Logging.info('connected to mongodb');
        StartServer();
    })
    .catch((error) => {
        Logging.error('unable to connect');
        Logging.error(error.message);
    });

/**Only start the server if Mongo connects */


const StartServer = () => {
    router.use((req, res, next) => {
        Logging.info(`Incoming -> [${req.method}] - URl: [${req.url}] - IP: [${req.socket.remoteAddress}]`);

        res.on('finish', () => {
            Logging.info(`Incoming -> [${req.method}] - URl: [${req.url}] - IP: [${req.socket.remoteAddress}] - status: [${res.statusCode}]`);
        });
        next();
    });
    router.use(express.urlencoded({ extended: true }));
    router.use(express.json());

    router.use((req, res, next) => {
        res.header('Access-Control-Allow-Origin', '*');
        res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');

        if (req.method == 'OPTIONS') {
            res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
            return res.status(200).json({});
        }
        next();
    });

    router.use('/policeAPI', policeRoutes);
    router.use('/stationAPI', stationRoutes);
    

    router.get('/check', (req, res, next) => {
        res.status(200).json({ message: 'checked' });
    });

    router.use((req, res, next) => {
        const error = new Error('Not found');
        Logging.error(error);

        return res.status(404).json({ message: error.message });
    });

    http.createServer(router).listen(config.server.port, () => {
        Logging.info(`server is running on port ${config.server.port}`);
    });
};
