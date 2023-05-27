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

const loggerConfig = {
  level: 'info',
  format: customFormat,
  defaultMeta: { service: 'user-service' },
  transports: [
    new transports.Console({ format: format.simple(), level: 'silly' }),
  ],
};

export default createLogger(loggerConfig);
