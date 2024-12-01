import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class ConfigServiceWrapper {
  constructor(private configService: ConfigService) {}

  // Access specific environment variables using this wrapper
  get(key: string): string {
    const value = this.configService.get<string>(key);
    if (!value) {
      throw new Error(`Config key ${key} not found`);
    }
    return value;
  }

  // Example method to get a port
  getPort(): number {
    return parseInt(this.get('PORT'), 10);
  }

  // Example method to get the Python backend URL
  getPythonBackendUrl(): string {
    return this.get('PYTHON_BACKEND_URL');
  }

  // Example method to get the database connection string
  getDbConnection(): string {
    return this.get('DATABASE_URL');
  }

  // Example for other custom configurations
  getJwtSecret(): string {
    return this.get('JWT_SECRET');
  }
}
