import { IMailTemplateDTO } from '../dtos/IMailTemplateDTO';

export default interface IProvedorTemplateEmail {
  parse(data: IMailTemplateDTO): Promise<string>;
}
