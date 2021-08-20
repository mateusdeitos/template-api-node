const {CodeGen, InputPrompt } = require('simple-codegen');

const codeGen = new CodeGen()

codeGen.setPrompts([
  new InputPrompt('name', 'Nome da rota'),
  new InputPrompt('module', 'Módulo da rota'),
])


module.exports = codeGen;
