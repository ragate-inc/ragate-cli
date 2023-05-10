export type Locale = {
  help: string;
  version: string;
  yourInput: string;
  command: {
    description: {
      create: string;
      add: string;
    };
  };
  options: {
    describe: {
      verbose: string;
      region: string;
      lang: string;
    };
  };
  unProcessed: {
    required: string;
    notFound: string;
  };
};
