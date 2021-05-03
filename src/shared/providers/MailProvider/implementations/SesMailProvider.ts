/* eslint-disable no-console */
import IMailTemplateProvider from '@shared/providers/MailTemplateProvider/models/IMailTemplateProvider';
import nodemailer, { Transporter } from 'nodemailer';
import aws from 'aws-sdk';
import mailConfig from '@config/mail';
import { injectable, inject } from 'tsyringe';
import { MAIL_TEMPLATE_PROVIDER_TOKEN } from '@shared/providers/MailTemplateProvider';
import ISendMailDTO from '../dtos/ISendMailDTO';
import IMailProvider from '../models/IMailProvider';

@injectable()
export default class SesMailProvider implements IMailProvider {
  private client: Transporter;

  constructor(
    @inject(MAIL_TEMPLATE_PROVIDER_TOKEN)
    private mailTemplateProvider: IMailTemplateProvider,
  ) {
    this.client = nodemailer.createTransport({
      SES: new aws.SES({
        apiVersion: '2010-12-01',
        region: 'us-east-2',
      }),
    });
  }

  public async send({
    subject,
    to,
    template,
    from,
  }: ISendMailDTO): Promise<void> {
    const { email, name } = mailConfig.defaults.from;
    this.client.sendMail(
      {
        from: {
          name: from?.name || name,
          address: from?.email || email,
        },
        to: {
          name: to.name,
          address: to.email,
        },
        subject,
        html: await this.mailTemplateProvider.parse(template),
      },
      error => console.log({ error }),
    );
  }
}
