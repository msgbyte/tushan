import nodePlop from 'node-plop';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

async function main() {
  const plop = await nodePlop(
    path.resolve(__dirname, '../templates/plopfile.js')
  );
  // get a generator by name
  const basic = plop.getGenerator('default');

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
