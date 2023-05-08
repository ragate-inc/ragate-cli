import yargonaut from 'yargonaut';

export const init = () => yargonaut.font('SansSerif').helpStyle('grey').errorsStyle('red');

export const chalk = yargonaut.chalk();

// const listFonts = (): string[] => {
//   return yargonaut.listFonts();
// };
