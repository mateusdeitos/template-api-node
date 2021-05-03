import fs from 'fs';
import handlebars from 'handlebars';
import IMailTemplateProvider from '../models/IMailTemplateProvider';
import { IMailTemplateDTO } from '../dtos/IMailTemplateDTO';

class HandlebarsMailTemplateProvider implements IMailTemplateProvider {
  public async parse({ file, variables }: IMailTemplateDTO): Promise<string> {
    const templateFile = await fs.promises.readFile(file, {
      encoding: 'utf-8',
    });
    const parseTemplate = handlebars.compile(templateFile);
    return parseTemplate(variables);
  }
}

export default HandlebarsMailTemplateProvider;
