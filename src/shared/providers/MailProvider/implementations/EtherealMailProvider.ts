/* eslint-disable no-console */
import nodemailer, { Transporter } from 'nodemailer';
import { injectable, inject } from 'tsyringe';
import IMailTemplateProvider from '@shared/providers/MailTemplateProvider/models/IMailTemplateProvider';
import SMTPTransport from 'nodemailer/lib/smtp-transport';
import { MAIL_TEMPLATE_PROVIDER_TOKEN } from '@shared/providers/MailTemplateProvider';
import IMailProvider from '../models/IMailProvider';
import ISendMailDTO from '../dtos/ISendMailDTO';

@injectable()
export default class EtherealMailProvider implements IMailProvider {
  private client: Transporter;

  constructor(
    @inject(MAIL_TEMPLATE_PROVIDER_TOKEN)
    private mailTemplateProvider: IMailTemplateProvider,
  ) {
    const SMTPConfig: SMTPTransport.Options = {
      host: 'smtp.ethereal.email',
      secure: false,
      auth: {
        user: 'stevie.schmidt@ethereal.email',
        pass: 'YNNnpkJtTHd8U7ugJs',
      },
    };
    const transporter = nodemailer.createTransport(SMTPConfig);
    this.client = transporter;
  }

  public async send({
    to,
    from,
    subject,
    template,
  }: ISendMailDTO): Promise<void> {
    try {
      const message = await this.client.sendMail({
        from: {
          name: from?.name || 'Team name',
          address: from?.email || 'mail@team.com.br',
        },
        to: {
          name: to.name,
          address: to.email,
        },
        subject,
        html: await this.mailTemplateProvider.parse(template),
      });
      console.log(`Message sent: ${message.messageId}`);
      console.log(`Preview URL: ${nodemailer.getTestMessageUrl(message)}`);
    } catch (error) {
      console.log(error.message);
    }
  }
}
