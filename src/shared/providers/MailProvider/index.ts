import { container } from 'tsyringe';
import mailConfig from '@config/mail';
import EtherealMailProvider from './implementations/EtherealMailProvider';
import SesMailProvider from './implementations/SesMailProvider';
import IMailProvider from './models/IMailProvider';

export const MAIL_PROVIDER_TOKEN = 'MailProviderToken';

container.registerInstance<IMailProvider>(
  MAIL_PROVIDER_TOKEN,
  mailConfig.driver === 'ethereal'
    ? container.resolve(EtherealMailProvider)
    : container.resolve(SesMailProvider),
);
