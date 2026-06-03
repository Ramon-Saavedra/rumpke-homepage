import { CONTACT_FORM_LIMITS } from './contact';

describe('CONTACT_FORM_LIMITS', () => {
  it('FIRST_NAME_MIN is 2', () => {
    expect(CONTACT_FORM_LIMITS.FIRST_NAME_MIN).toBe(2);
  });

  it('FIRST_NAME_MAX is 50', () => {
    expect(CONTACT_FORM_LIMITS.FIRST_NAME_MAX).toBe(50);
  });

  it('LAST_NAME_MIN is 2', () => {
    expect(CONTACT_FORM_LIMITS.LAST_NAME_MIN).toBe(2);
  });

  it('LAST_NAME_MAX is 50', () => {
    expect(CONTACT_FORM_LIMITS.LAST_NAME_MAX).toBe(50);
  });

  it('COMPANY_MAX is 100', () => {
    expect(CONTACT_FORM_LIMITS.COMPANY_MAX).toBe(100);
  });

  it('PHONE_MAX is 20', () => {
    expect(CONTACT_FORM_LIMITS.PHONE_MAX).toBe(20);
  });

  it('MESSAGE_MIN is 10', () => {
    expect(CONTACT_FORM_LIMITS.MESSAGE_MIN).toBe(10);
  });

  it('MESSAGE_MAX is 1000', () => {
    expect(CONTACT_FORM_LIMITS.MESSAGE_MAX).toBe(1000);
  });

  it('min values are smaller than their corresponding max values', () => {
    expect(CONTACT_FORM_LIMITS.FIRST_NAME_MIN).toBeLessThan(CONTACT_FORM_LIMITS.FIRST_NAME_MAX);
    expect(CONTACT_FORM_LIMITS.LAST_NAME_MIN).toBeLessThan(CONTACT_FORM_LIMITS.LAST_NAME_MAX);
    expect(CONTACT_FORM_LIMITS.MESSAGE_MIN).toBeLessThan(CONTACT_FORM_LIMITS.MESSAGE_MAX);
  });
});
