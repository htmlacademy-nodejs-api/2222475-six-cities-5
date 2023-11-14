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
            ${chalk.green('--version')}:                   ${chalk.cyan('# выводит номер версии приложения')}
            ${chalk.green('--help')}:                      ${chalk.cyan('# выводит информацию по приложению и его командам')}
            ${chalk.green('--import <path>')}:             ${chalk.cyan('# импортирует данные из файла path в формате TSV в базу данных MongoDB')}
            ${chalk.green('--generate <n> <path> <url>')}  ${chalk.cyan('# генерирует n тестовых данных из url и сохраняет их в path')}
    `);
  }
}
