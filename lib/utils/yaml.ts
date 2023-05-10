import jsyaml from 'js-yaml';
import fs from 'fs';

export const writeYaml = (path: string, data: Record<string, unknown>): string => {
  const yamlText = jsyaml.dump(data);
  // TODO: ディレクトリを再帰的に作成すること
  fs.writeFileSync(path, yamlText, 'utf8');
  return yamlText;
};

export const readYaml = (path: string) => {
  return jsyaml.load(fs.readFileSync(path, 'utf8'));
};
