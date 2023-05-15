export class BaseClass extends Error {
  constructor(message?: string) {
    super(message);
    this.name = new.target.name;
    if (Error.captureStackTrace) Error.captureStackTrace(this, this.constructor);
    Object.setPrototypeOf(this, new.target.prototype);
  }
}

export class EnvironmentError extends BaseClass {
  constructor(message?: string) {
    super(message);
    this.name = 'EnvironmentError';
  }
}

export class CLIError extends BaseClass {
  constructor(message?: string) {
    super(message);
    this.name = 'CLIError';
  }
}

export class DuplicatedPropertyError extends BaseClass {
  constructor(message?: string) {
    super(message);
    this.name = 'DuplicatedPropertyError';
  }
}
