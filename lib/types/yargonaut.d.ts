declare module 'yargonaut' {
  export interface Yargonaut {
    style(str: string): Yargonaut;
    font(str: string): Yargonaut;
    help(str: string): Yargonaut;
    helpStyle(str: string): Yargonaut;
    errors(str: string): Yargonaut;
    errorsStyle(str: string): Yargonaut;
    chalk(str: string): Yargonaut;
  }
  function style(str: string): Yargonaut;
  function font(str: string): Yargonaut;
  function help(str: string): Yargonaut;
  function helpStyle(str: string): Yargonaut;
  function errors(str: string): Yargonaut;
  function errorsStyle(str: string): Yargonaut;

  function listFonts(): string[];
  function chalk(): {
    grey(str: string): string;
    green(str: string): string;
    red(str: string): string;
  };
}
