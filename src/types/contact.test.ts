import { ContactSubmitError } from './contact';

describe('ContactSubmitError', () => {
  it('is an instance of Error', () => {
    const err = new ContactSubmitError(500);
    expect(err).toBeInstanceOf(Error);
  });

  it('sets name to ContactSubmitError', () => {
    const err = new ContactSubmitError(500);
    expect(err.name).toBe('ContactSubmitError');
  });

  it('stores statusCode', () => {
    const err = new ContactSubmitError(400);
    expect(err.statusCode).toBe(400);
  });

  it('stores fieldErrors when provided', () => {
    const fieldErrors = { email: ['Ungültige E-Mail'] };
    const err = new ContactSubmitError(400, fieldErrors);
    expect(err.fieldErrors).toEqual(fieldErrors);
  });

  it('fieldErrors is undefined when not provided', () => {
    const err = new ContactSubmitError(500);
    expect(err.fieldErrors).toBeUndefined();
  });

  it('stores globalError when provided', () => {
    const err = new ContactSubmitError(500, undefined, 'Serverfehler');
    expect(err.globalError).toBe('Serverfehler');
    expect(err.message).toBe('Serverfehler');
  });

  it('uses default message when globalError is not provided', () => {
    const err = new ContactSubmitError(500);
    expect(err.message).toBe('Ein Fehler ist aufgetreten.');
  });
});
