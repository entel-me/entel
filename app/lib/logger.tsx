export const dbLogger = {
  info: (message, extra?) => {
    newLog("db", "info", message, extra)
  },
  warn: (message, extra?) => {
    newLog("db", "warn", message, extra)
  },
  error: (message, extra?) => {
    newLog("db", "error", message, extra)
  },
  debug: (message, extra?) => {
    newLog("db", "debug", message, extra)
  },
}

export const appLogger = {
  info: (message, extra?) => {
    newLog("app", "info", message, extra)
  },
  warn: (message, extra?) => {
    newLog("app", "warn", message, extra)
  },
  error: (message, extra?) => {
    newLog("app", "error", message, extra)
  },
  debug: (message, extra?) => {
    newLog("app", "debug", message, extra)
  },
}

const newLog = (logger, level: string, message, extra = "") => {
  console.log(`$${logger.toUpperCase()} $ ${level.toUpperCase()}$ - ${message} ${extra}`)
}
