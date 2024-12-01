export interface ConfigInterface {
  port: number;
  pythonBackendUrl: string;
  databaseUrl: string;
  jwtSecret: string;
  nodeEnv: string; // Optionally you can add environment-specific variables
}
