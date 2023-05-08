import { Logger } from 'pino';
// import config from 'config';
// import { getLocaleLang } from 'features/create/utils/getLocale';

export default async (args: { argv: Record<string, unknown>; logger: Logger }): Promise<void> => {
  const {
    // argv,
    logger,
  } = args;
  // const locale = getLocaleLang(config.lang);
  await (() => Promise.resolve())();
  logger.info('coming soon ...');
};
