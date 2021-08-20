const {CodeGen, InputPrompt } = require('simple-codegen');

const codeGen = new CodeGen()

codeGen.setPrompts([
  new InputPrompt('name', 'Nome do controller'),
  new InputPrompt('module', 'Módulo do controller'),
])


module.exports = codeGen;
