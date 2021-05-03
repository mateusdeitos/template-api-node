import { MAIL_PROVIDER_TOKEN } from '@shared/providers/MailProvider';
import IMailProvider from '@shared/providers/MailProvider/models/IMailProvider';
import { inject, injectable } from 'tsyringe';
import ISendMailDTO from '@shared/providers/MailProvider/dtos/ISendMailDTO';

@injectable()
export default class SendMailService {
  constructor(
    @inject(MAIL_PROVIDER_TOKEN)
    private mailProvider: IMailProvider,
  ) {}

  public async execute({ ...data }: ISendMailDTO): Promise<void> {
    return this.mailProvider.send({ ...data });
  }
}
