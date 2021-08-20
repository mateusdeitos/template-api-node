const { CodeGen, InputPrompt, Step, ListPrompt, Template } = require('simple-codegen');
const script = require('util').promisify(require('child_process').exec);

const codeGen = new CodeGen({

  onFilesCreated: async (files) => {
    console.warn('Applying linter...')
    const promises = files.reduce((prev, file) => prev.then(() => script(`yarn eslint --fix ${file}`)), Promise.resolve())
    await Promise.all(promises).then(() => console.warn('Finished linter'));
  },

  onParseAllAnswers: (answers, _config) => {
    const { fields, primary_field } = answers;
    if (!fields || !Array.isArray(fields)) return answers;
    const imports = new Set();
    imports.add('Entity');
    imports.add('CreateDateColumn');
    imports.add('UpdateDateColumn');

    const buildCampo = campo => {
      if (campo.name === primary_field) {
        imports.add('PrimaryColumn');
        return `\t@PrimaryColumn()\n\t${campo.name}: ${campo.type};`
      }

      imports.add('Column');
      return `\t@Column()\n\t${campo.name}: ${campo.type};`
    }

    const fieldStr = fields.map(campo => buildCampo(answers[`field_${campo}`])).join("\n\n");
    const importsStr = imports.size > 0 ? `import { ${[...imports].join(', ')} } from 'typeorm';` : "";

    return {
      imports: importsStr,
      fields: fieldStr,
    }
  }
})
.addTemplate(new Template(__dirname, '..', 'NewEntity', 'templates'))
.addTemplate(new Template(__dirname, '..', 'NewRepository', 'templates'))
.addTemplate(new Template(__dirname, '..', 'NewDependency', 'templates'))
.addTemplate(new Template(__dirname, '..', 'NewService', 'templates'))
.addTemplate(new Template(__dirname, '..', 'NewController', 'templates'))
.addTemplate(new Template(__dirname, '..', 'NewRoute', 'templates'))

codeGen
  .addStep(new Step([
    new InputPrompt('name', 'Qual é o nome da entity?'),
    new InputPrompt('module', 'Qual é o nome do módulo?'),
    new InputPrompt('fields', 'Defina o nome dos campos da entity (separados por vírgula)').setParser(campos => campos.split(',').map(c => c.trim().toLowerCase())),
  ]))
  .addStep(new Step((answers, config) => {
    const fields = answers.fields;

    const prompts = [];
    prompts.push(
      new ListPrompt('primary_field', 'Qual campo é a chave primária?')
        .setChoices(fields.map(campo => ({ name: campo, value: campo })))
    )

    prompts.push(...fields.map(campo => new ListPrompt(campo, `[${campo}] - Qual o tipo do campo?`).setPrefix("field_")
      .setChoices([
        {
          name: 'string',
          value: 'string',
        },
        {
          name: 'number',
          value: 'number',
        },
        {
          name: 'boolean',
          value: 'boolean',
        },
        {
          name: 'Date',
          value: 'Date',
        },
      ])
      .setParser((type) => {
        return {
          name: campo,
          type,
        }
      }))
    );

    return prompts;
  }))

module.exports = codeGen;
