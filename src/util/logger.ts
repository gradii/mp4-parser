const logger = {
  DEBUG: 'debug',
  INFO : 'info',
  WARN : 'warn',
  ERROR: 'error',

  log(level: string, message: string, ...params: any[]) {
    /* eslint-disable no-console */
    // @ts-ignore
    const method = console[level] ? level : 'log';
    // @ts-ignore
    console[method]('[griffith] ' + message, ...params);
    /* eslint-enable no-console */
  },

  debug(...args: any[]) {
    this.log(this.DEBUG, ...args);
  },

  info(...args: any[]) {
    this.log(this.INFO, ...args);
  },

  warn(...args: any[]) {
    this.log(this.WARN, ...args);
  },

  error(...args: any[]) {
    this.log(this.ERROR, ...args);
  },
};

export default logger;
