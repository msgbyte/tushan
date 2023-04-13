import path from 'path';
import _ from 'lodash';

export default function (
  /** @type {import('plop').NodePlopAPI} */
  plop
) {
  const prompts = [
    {
      type: 'input',
      name: 'name',
      require: true,
      message: 'Project Name',
    },
    {
      type: 'input',
      name: 'author',
      message: 'Project Author',
      default: 'anonymous',
    },
  ];

  // 服务端插件的前端模板代码
  plop.setGenerator('default', {
    description: 'Tushan default template',
    prompts,
    actions: [
      {
        type: 'addMany',
        destination: path.resolve(process.cwd(), './{{name}}/'),
        base: './default',
        templateFiles: [
          './default/**/*',
        ],
        skipIfExists: true,
        globOptions: {},
      },
    ],
  });
};
