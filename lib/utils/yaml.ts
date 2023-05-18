import fs from 'fs';
import jsyaml from 'js-yaml';
import { schema } from 'yaml-cfn';
import { asFullPath, createDirectories } from 'utils/cli';

export const writeYaml = (destinationPath: string, data: Record<string, unknown> | Record<string, unknown>[]): string => {
  const yamlText = jsyaml.dump(data, { schema, indent: 2, lineWidth: -1 });
  createDirectories(destinationPath);
  fs.writeFileSync(asFullPath(destinationPath), yamlText, 'utf8');
  return yamlText;
};

export const loadYaml = <T>(sourcePath: string): T => {
  return jsyaml.load(fs.readFileSync(asFullPath(sourcePath), 'utf8'), { schema }) as T;
};
