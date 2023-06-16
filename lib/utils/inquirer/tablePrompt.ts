import { Answers } from 'inquirer';
import InquirerTablePrompt from 'inquirer-table-prompt';
import _ from 'lodash';
import { Interface as ReadlineInterface } from 'readline';

type Question = {
  type: string;
  name: string;
  message?: string;
  validate?: (values: string[]) => boolean | string;
  columns: { name: string; value: string }[];
  rows: { name: string; value: string }[];
  pageSize?: number;
};

export default class TablePrompt extends InquirerTablePrompt {
  [x: string]: string[];

  constructor(questions: Question, rl: ReadlineInterface, answers: Answers) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call
    super(questions, rl, answers);

    this.values = _.map(questions.rows, (row) => {
      return row.value;
    });
  }
}
