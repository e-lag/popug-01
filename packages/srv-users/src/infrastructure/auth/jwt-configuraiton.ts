import { Logger } from '@nestjs/common';
import { ConfigService, registerAs } from '@nestjs/config';
import { JwtModuleOptions } from '@nestjs/jwt/dist/interfaces/jwt-module-options.interface';
import * as fs from 'fs';
import { SignOptions } from 'jsonwebtoken';
import * as process from 'process';

export const JWT_CONFIG = 'JWT_CONFIG';

/**
 * Настройки JWT
 */
export const JWT_CONFIGURATION = registerAs(JWT_CONFIG, (): JwtModuleOptions => {
  const configService = new ConfigService();
  const signOptions: SignOptions = {
    algorithm: 'RS256',
    expiresIn: '1y',
  };

  const publicKeyPath = configService.get<string | null>('SRV_USER_JWT_PUBLIC_KEY', null);
  const privateKeyPath = configService.get<string | null>('SRV_USER_JWT_PRIVATE_KEY', null);
  Logger.debug({ publicKeyPath, privateKeyPath, pwd: process.cwd() });

  if (!publicKeyPath) {
    throw new Error(`ENV: "SRV_USER_JWT_PUBLIC_KEY" not found. Check '.env' file or server variables.`);
  }

  if (!privateKeyPath) {
    throw new Error(`ENV: "SRV_USER_JWT_PRIVATE_KEY" not found. Check '.env' file or server variables.`);
  }

  if (!fs.existsSync(publicKeyPath)) {
    throw new Error(`JWT PUBLIC_KEY file not found. Check '.env' file or server variables.`);
  }

  if (!fs.existsSync(privateKeyPath)) {
    throw new Error(`JWT PRIVATE_KEY file not found. Check '.env' file or server variables.`);
  }

  const publicKey = fs.readFileSync(publicKeyPath);
  const secretOrPrivateKey = fs.readFileSync(privateKeyPath);

  return {
    // global: true,
    signOptions,
    // secret?: string | Buffer;
    // privateKey?: jwt.Secret;
    publicKey,
    secretOrPrivateKey,
    // secretOrKeyProvider?: (requestType: JwtSecretRequestType, tokenOrPayload: string | object | Buffer, options?: jwt.VerifyOptions | jwt.SignOptions) => jwt.Secret;
    // verifyOptions?: jwt.VerifyOptions;
  };
});
