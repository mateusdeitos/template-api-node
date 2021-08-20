const { CodeGen, InputPrompt, Template, ListPrompt } = require('simple-codegen');

const codeGen = new CodeGen()

codeGen.setPrompts([
  new InputPrompt('name', 'Nome do service'),
  new InputPrompt('module', 'Módulo do service'),
  new ListPrompt('createRepository', 'Criar repositórios?').setChoices([
    {
      name: 'Sim',
      value: true,
    },
    {
      name: 'Não',
      value: false,
    }
  ]),
  new ListPrompt('createDependencies', 'Criar injeção de dependências?').setChoices([
    {
      name: 'Sim',
      value: true,
    },
    {
      name: 'Não',
      value: false,
    }
  ])
])
  .addTemplate(new Template(__dirname, 'templates'))
  .addTemplate(new Template(__dirname, '..', 'NewRepository', 'templates').setConditionToCreate(answers => !!answers.createRepository))
  .addTemplate(new Template(__dirname, '..', 'NewDependency', 'templates').setConditionToCreate(answers => !!answers.createDependencies))


module.exports = codeGen;
