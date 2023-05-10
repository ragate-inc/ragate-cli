export type Locale = {
  usage: string;
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
    };
  };
  unProcessed: {
    required: string;
    notFound: string;
  };
};
