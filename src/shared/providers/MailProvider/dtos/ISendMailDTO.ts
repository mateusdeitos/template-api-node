import { IMailTemplateDTO } from '@shared/providers/MailTemplateProvider/dtos/IMailTemplateDTO';

interface IContact {
	name: string;
	email: string;
}

export default interface ISendMailDTO {
	from?: IContact;
	to: IContact;
	subject: string;
	template: IMailTemplateDTO;
}
