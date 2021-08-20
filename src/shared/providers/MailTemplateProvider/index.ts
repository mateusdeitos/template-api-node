import { container } from 'tsyringe';
import HandlebarsMailTemplateProvider from './implementations/HandlebarsMailTemplateProvider';
import IMailTemplateProvider from './models/IMailTemplateProvider';

export const MAIL_TEMPLATE_PROVIDER_TOKEN = 'MailTemplateProvider';

container.registerSingleton<IMailTemplateProvider>(
	MAIL_TEMPLATE_PROVIDER_TOKEN,
	HandlebarsMailTemplateProvider,
);
