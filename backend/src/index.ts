import 'reflect-metadata';
import path from 'path';
import { fixModuleAlias } from './utils/fix-module-alias';
fixModuleAlias(__dirname);
import { appConfig } from '@base/config/app';
import { Container } from 'typedi';
import express from 'express';
import { useContainer as routingControllersUseContainer, useExpressServer, getMetadataArgsStorage, createExpressServer } from 'routing-controllers';
import bodyParser from 'body-parser';
import cors from 'cors';
import { LMMService } from "./api/services/lmm.service";
const compression = require("compression");

export class App {
  private port: Number = appConfig.port;
  private app: express.Application = express();

  public constructor() {
    this.bootstrap();
  }

  public async bootstrap() {
    this.useContainers();
    this.setupMiddlewares();
    this.registerRoutingControllers();
    this.registerServices();
    this.setUpCompression();
  }


  private registerServices() {
    Container.get(LMMService)
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
      controllers: [path.join(__dirname + appConfig.controllersDir)],
    });

    console.log([path.join(__dirname + appConfig.controllersDir)]);

    console.log('🚀️ Registered controllers: ', getMetadataArgsStorage().controllers.map(c => c.target.name).join(', '));

    const server = require('http').Server(this.app);
    server.listen(this.port, () => console.log(`🚀 Server started at http://localhost:${this.port}\n🚨️ Environment: ${process.env.NODE_ENV}`));
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