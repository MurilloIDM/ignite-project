import { IMailprovider } from "@shared/container/providers/MailProvider/IMailProvider";

class MailProviderInMemory implements IMailprovider {
  private message: any[] = [];

  async sendMail(
    to: string,
    subject: string,
    variables: any,
    path: string
  ): Promise<void> {
    this.message.push({
      to,
      subject,
      variables,
      path,
    });
  }
}

export { MailProviderInMemory };
