/* eslint-disable no-console */
// eslint-disable-next-line import/prefer-default-export
export const CONSOLE = {
  log(message, ...args) {
    console.log(message, args)
  },
  info(message, ...args) {
    console.info(message, args)
  },
  warn(message, ...args) {
    conso.warn(message, args)
  },
  error(message, ...args) {
    console.error(message, args)
  },
  table(message, ...args) {
    console.table(message, args)
  }
}
