import { container } from "tsyringe";

import { IDateProvider } from "./DateProvider/IDateProvider";
import { DayjsProvider } from "./DateProvider/implementations/DayjsProvider";
import { IMailprovider } from "./MailProvider/IMailProvider";
import { EtherealMailProvider } from "./MailProvider/implementations/EtherealMailProvider";

container.registerSingleton<IDateProvider>("DayjsProvider", DayjsProvider);

container.registerInstance<IMailprovider>(
  "EtherealMailProvider",
  new EtherealMailProvider()
);
