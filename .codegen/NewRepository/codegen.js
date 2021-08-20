const {CodeGen, InputPrompt } = require('simple-codegen');

const codeGen = new CodeGen()

codeGen.setPrompts([
  new InputPrompt('name', 'Nome do repositório'),
  new InputPrompt('module', 'Módulo do repositório'),
])


module.exports = codeGen;
