import { Logger } from '@nestjs/common';
import { ConfigFactory, ConfigService, registerAs } from '@nestjs/config';
import { JwtModuleOptions } from '@nestjs/jwt';
import * as fs from 'fs';
import { SignOptions } from 'jsonwebtoken';
import * as process from 'process';

export const JWT_CONFIG = 'JWT_CONFIG';

/**
 * Настройки JWT
 */
export const JWT_CONFIGURATION = (envPublicKey: string): ConfigFactory =>
  registerAs(JWT_CONFIG, (): JwtModuleOptions => {
    const configService = new ConfigService();
    const signOptions: SignOptions = {
      algorithm: 'RS256',
      expiresIn: '1y',
    };

    const publicKeyPath = configService.get<string | null>(envPublicKey, null);

    Logger.debug({ publicKeyPath, pwd: process.cwd() });

    if (!publicKeyPath) {
      throw new Error(`ENV: "${envPublicKey}" not found. Check '.env' file or server variables.`);
    }

    if (!fs.existsSync(publicKeyPath)) {
      throw new Error(`File in ${envPublicKey}: '${publicKeyPath}' not found. Check '.env' file or server variables.`);
    }

    const publicKey = fs.readFileSync(publicKeyPath);

    return {
      // global: true,
      signOptions,
      // secret?: string | Buffer;
      // privateKey?: jwt.Secret;
      publicKey,
      // secretOrPrivateKey,
      // secretOrKeyProvider?: (requestType: JwtSecretRequestType, tokenOrPayload: string | object | Buffer, options?: jwt.VerifyOptions | jwt.SignOptions) => jwt.Secret;
      // verifyOptions?: jwt.VerifyOptions;
    };
  });
