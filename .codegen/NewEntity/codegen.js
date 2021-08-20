const { CodeGen, InputPrompt, Step, ListPrompt, Template } = require('simple-codegen');

const codeGen = new CodeGen({
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

    const fieldStr = fields.map(campo => buildCampo(answers[campo])).join("\n\n");
    const importsStr = imports.size > 0 ? `import { ${[...imports].join(', ')} } from 'typeorm';` : "";

    return {
      imports: importsStr,
      fields: fieldStr,
    }
  }
})

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

    prompts.push(...fields.map(campo => new ListPrompt(campo, `[${campo}] - Qual o tipo do campo?`)
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
