export const loggerOptions = {
  pinoHttp: {
    transport: {
      target: 'pino-pretty',
      options: {
        messageKey: 'message',
      },
    },
    messageKey: 'message',
  },
};
