import { env } from "@base/utils/env";

function getAppPath() {
  let currentDir = __dirname;
  return currentDir;
}

export const appConfig = {
  node: env('NODE_ENV') || 'development',
  isProduction: env('NODE_ENV') === 'production',
  isStaging: env('NODE_ENV') === 'staging',
  isDevelopment: env('NODE_ENV') === 'development',
  name: env('APP_NAME'),
  port: Number(env('APP_PORT', '3001')),
  routePrefix: env('APP_ROUTE_PREFIX', '/api'),
  groqAPIKey: env('GROQ_API_KEY'),
  appPath: getAppPath(),

  entitiesDir: env('TYPEORM_ENTITIES_DIR'),
  controllersDir: env('CONTROLLERS_DIR'),
  middlewaresDir: env('MIDDLEWARES_DIR'),

};
