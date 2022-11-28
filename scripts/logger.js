import chalk from 'chalk';

const log = console.log;
const warn = console.warn;
const error = console.error;

const getPrefix = () => {
  const time = new Date();
  const hours = `${time.getHours()}`.padStart(2, '0');
  const minutes = `${time.getMinutes()}`.padStart(2, '0');
  const secondes = `${time.getSeconds()}`.padStart(2, '0');
  return `[${hours}:${minutes}:${secondes}]`
}

console.log = (...args) => {
  log.apply(console, [chalk.cyan(getPrefix()), ...args]);
}

console.warn = (...args) => {
  warn.apply(console, [chalk.yellow(getPrefix()), ...args]);
}

console.error = (...args) => {
  error.apply(console, [chalk.bold.red(getPrefix()), ...args]);
}
