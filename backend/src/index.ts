import 'reflect-metadata';
import { appConfig } from './config/app';
import { Container } from 'typedi';
import express from 'express';
import { useContainer as routingControllersUseContainer, useExpressServer, getMetadataArgsStorage } from 'routing-controllers';
import * as swaggerUiExpress from 'swagger-ui-express';
import bodyParser from 'body-parser';
import cors from 'cors';
import listEndpoints from 'express-list-endpoints';
import { LMMService } from "./api/services/lmm.service";
import { LLMController } from './api/controllers/LLMController';
import { routingControllersToSpec } from 'routing-controllers-openapi';
const compression = require("compression");

export class App {
  private port: Number = appConfig.port;
  private app: express.Application = express();

  public constructor() {
    this.bootstrap();
  }

  public async bootstrap() {
    this.setupMiddlewares();
    this.useContainers();
    this.setupSwagger();
    this.registerServices();
    this.setUpCompression();
    this.registerRoutingControllers();
  }


  private registerServices() {
    Container.get(LMMService)
    Container.get(LLMController)
  }

  private useContainers() {
    routingControllersUseContainer(Container);
  }

  private setupMiddlewares() {
    this.app.use(cors());

    // For file upload
    this.app.use(bodyParser.urlencoded({ extended: true }));
    this.app.use(bodyParser.json({ limit: '25mb' }));
  }

  private setUpCompression() {
    this.app.use(compression());
  }

  private registerRoutingControllers() {
    useExpressServer(this.app, {
      validation: { stopAtFirstError: true },
      classTransformer: true,
      defaultErrorHandler: false,
      routePrefix: appConfig.routePrefix,
      controllers: [LLMController],
    });

    console.log('🚀️ Registered controllers: ', getMetadataArgsStorage().controllers.map(c => c.target.name).join(', '));

    const server = require('http').Server(this.app);
    server.listen(this.port, () => console.log(`🚀 Server started at http://localhost:${this.port}\n🚨️ Environment: ${process.env.NODE_ENV}`));

    console.log(listEndpoints(this.app));
  }

  private setupSwagger() {
    const storage = getMetadataArgsStorage();
    const spec = routingControllersToSpec(
      storage,
      { routePrefix: appConfig.routePrefix },
      {
        components: {
          securitySchemes: {
          },
        },
      },
    );
    this.app.use('/docs', swaggerUiExpress.serve, swaggerUiExpress.setup(spec));
  }

}

const app = new App();


// === Handle process events to save data before exit ===
process.on('beforeExit', async (code) => {
  console.log(`Process will exit with code: ${code}`)
  process.exit(0);
})

process.on('SIGINT', async () => {
  console.log('Received SIGINT signal');
  process.exit(0);
});