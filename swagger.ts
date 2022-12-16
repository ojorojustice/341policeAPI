import { application, Express, Request, Response } from 'express';
import swaggerJsdoc from 'swagger-jsdoc';
import swaggerui from 'swagger-ui-express';
import { version } from './package.json';
import Logging from './src/library/Logging';
import log from './src/library/Logging';

const options: swaggerJsdoc.Options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'CSE 341 API Second Project',
            version
        }
    },
    apis: ['./src/routes.ts', '.src/controllers/*.ts']
};

const swaggerSpecification = swaggerJsdoc(options);

function swaggerDocs (app: Express, port: number){
app.use('/api-docs', swaggerui.serve, swaggerui.setup(swaggerSpecification));

app.get('docs.json', (req: Request, res: Response)=>{
res.setHeader('Content-Type', 'application/json');
res.send(swaggerSpecification);

})
}

Logging.info(`logs available at http://`)
