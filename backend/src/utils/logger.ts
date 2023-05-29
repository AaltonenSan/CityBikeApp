import { format, transports, createLogger, Logform } from 'winston';

// Modifying the log line format for easier reading
const customFormat = format.combine(
  format.timestamp({ format: 'YYYYMMDD|HH:mm:ss' }),
  format.printf((info: Logform.TransformableInfo) => {
    return `${info.timestamp}|${info.level.toLocaleUpperCase()}|${
      info.message
    }`;
  })
);

// Log api requests and responses to console
const logger = createLogger({
  level: 'info',
  format: customFormat,
  defaultMeta: { service: 'user-service' },
  transports: [
    new transports.Console({ format: format.simple(), level: 'silly' }),
  ],
});

// Log debug messages to console, but not when running tests
const debugLogger = createLogger({
  level: 'debug',
  defaultMeta: { service: 'user-service' },
  transports: [
    new transports.Console({
      format: format.simple(),
      level: 'silly',
      silent: process.env.NODE_ENV === 'test',
    }),
  ],
});

export { logger, debugLogger };
