export const HANDLE_COMMAND = 'HANDLE_COMMAND'
export const PRINT_ERROR = 'PRINT_ERROR'

export function handleCommand (command) {
  return {
    type: HANDLE_COMMAND,
    command
  }
}

export function printError (message) {
  return {
    type: PRINT_ERROR,
    message
  }
}
