"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const http_1 = __importDefault(require("http"));
const mongoose_1 = __importDefault(require("mongoose"));
const config_1 = require("./config/config");
const Logging_1 = __importDefault(require("./library/Logging"));
const Police_1 = __importDefault(require("./routes/Police"));
const Stations_1 = __importDefault(require("./routes/Stations"));
//import swaggerDocument from './swagger.json'
const router = (0, express_1.default)();
/**Connect to mongo */
mongoose_1.default
    .connect(config_1.config.mongo.url, { retryWrites: true, w: 'majority' })
    .then(() => {
    Logging_1.default.info('connected to mongodb');
    StartServer();
})
    .catch((error) => {
    Logging_1.default.error('unable to connect');
    Logging_1.default.error(error.message);
});
/**Only start the server if Mongo connects */
const StartServer = () => {
    router.use((req, res, next) => {
        Logging_1.default.info(`Incoming -> [${req.method}] - URl: [${req.url}] - IP: [${req.socket.remoteAddress}]`);
        res.on('finish', () => {
            Logging_1.default.info(`Incoming -> [${req.method}] - URl: [${req.url}] - IP: [${req.socket.remoteAddress}] - status: [${res.statusCode}]`);
        });
        next();
    });
    router.use(express_1.default.urlencoded({ extended: true }));
    router.use(express_1.default.json());
    router.use((req, res, next) => {
        res.header('Access-Control-Allow-Origin', '*');
        res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
        if (req.method == 'OPTIONS') {
            res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
            return res.status(200).json({});
        }
        next();
    });
    router.use('/policeAPI', Police_1.default);
    router.use('/stationAPI', Stations_1.default);
    router.get('/check', (req, res, next) => {
        res.status(200).json({ message: 'checked' });
    });
    router.use((req, res, next) => {
        const error = new Error('Not found');
        Logging_1.default.error(error);
        return res.status(404).json({ message: error.message });
    });
    http_1.default.createServer(router).listen(config_1.config.server.port, () => {
        Logging_1.default.info(`server is running on port ${config_1.config.server.port}`);
    });
};
