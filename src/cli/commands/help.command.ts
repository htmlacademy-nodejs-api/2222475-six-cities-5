import { Command } from './command.interface.js';
import chalk from 'chalk';

export class HelpCommand implements Command {
  public getName(): string {
    return '--help';
  }

  public async execute(..._parameters: string[]): Promise<void> {
    console.info(`
        ${chalk.red('Программа для подготовки данных для REST API сервера.')}

        Пример: ${chalk.blue('cli.js --<command> [--arguments]')}

        Команды:
            ${chalk.green('--version')}:                   ${chalk.cyan('# выводит номер версии')}
            ${chalk.green('--help')}:                      ${chalk.cyan('# печатает этот текст')}
            ${chalk.green('--import <path>')}:             ${chalk.cyan('# импортирует данные из TSV')}
            ${chalk.green('--generate <n> <path> <url>')}  ${chalk.cyan('# генерирует произвольное количество тестовых данных')}
    `);
  }
}
