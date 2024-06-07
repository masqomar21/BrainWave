/* eslint-disable no-console */
// eslint-disable-next-line import/prefer-default-export
export const CONSOLE = {
  log(message, ...opsionalParams) {
    console.log(message, ...opsionalParams)
  },
  info(message, ...opsionalParams) {
    console.info(message, ...opsionalParams)
  },
  warn(message, ...opsionalParams) {
    console.warn(message, ...opsionalParams)
  },
  error(message, ...opsionalParams) {
    console.error(message, ...opsionalParams)
  },
  table(message, ...opsionalParams) {
    console.table(message, ...opsionalParams)
  }
}
