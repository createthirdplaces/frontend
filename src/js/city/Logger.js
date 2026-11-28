class Logger {
  handleError({ errorData, message, intervalPid }) {
    console.error(message);
    if (intervalPid) {
      clearInterval(intervalPid);
    }

    throw errorData;
  }
}

export function createLogger() {
  return new Logger();
}
