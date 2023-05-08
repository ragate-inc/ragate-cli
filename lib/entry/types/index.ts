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
  describe: {
    verbose: string;
    template: string;
  };
  unProcessed: {
    required: string;
    notFound: string;
  };
};
