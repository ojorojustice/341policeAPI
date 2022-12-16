"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const swagger_jsdoc_1 = __importDefault(require("swagger-jsdoc"));
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const package_json_1 = require("./package.json");
const Logging_1 = __importDefault(require("./src/library/Logging"));
const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'CSE 341 API Second Project',
            version: package_json_1.version
        }
    },
    apis: ['./src/routes.ts', '.src/controllers/*.ts']
};
const swaggerSpecification = (0, swagger_jsdoc_1.default)(options);
function swaggerDocs(app, port) {
    app.use('/api-docs', swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(swaggerSpecification));
    app.get('docs.json', (req, res) => {
        res.setHeader('Content-Type', 'application/json');
        res.send(swaggerSpecification);
    });
}
Logging_1.default.info(`logs available at http://`);
