export class BaseClass extends Error {
  constructor(message?: string) {
    super(message);
    this.name = new.target.name;
    if (Error.captureStackTrace) Error.captureStackTrace(this, this.constructor);
    Object.setPrototypeOf(this, new.target.prototype);
  }
}

export class SystemError extends BaseClass {
  constructor(message?: string) {
    super(message);
    this.name = 'SystemError';
  }
}
