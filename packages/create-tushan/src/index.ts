import nodePlop from 'node-plop';
import path from 'path';
import { fileURLToPath } from 'url';
import inquirer from 'inquirer';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const plop = await nodePlop(
  path.resolve(__dirname, '../templates/plopfile.js')
);

async function main() {
  const res = await inquirer.prompt([
    {
      type: 'list',
      name: 'template',
      message: 'Choose Template',
      default: 'default',
      choices: plop.getGeneratorList().map((v) => ({
        name: `${v.name} (${v.description})`,
        value: v.name,
      })),
    },
  ]);
  const template = String(res.template);

  // get a generator by name
  const basic = plop.getGenerator(template ?? 'default');

  const answers = await basic.runPrompts();
  const results = await basic.runActions(answers);

  console.log('Changes:');
  console.log(results.changes.map((change) => change.path).join('\n'));

  if (results.failures.length > 0) {
    console.log('Operation failed:');
    console.log(results.failures);
  }
}

main();
