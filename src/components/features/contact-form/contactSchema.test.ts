import { contactSchema } from './contactSchema';

const validData = {
  firstName: 'Anna',
  lastName: 'Müller',
  email: 'anna@example.de',
  message: 'Das ist eine gültige Testnachricht.',
  consentAccepted: true,
};

describe('contactSchema', () => {
  describe('firstName', () => {
    it('accepts a valid first name', () => {
      expect(contactSchema.safeParse(validData).success).toBe(true);
    });

    it('rejects first name shorter than 2 characters', () => {
      const result = contactSchema.safeParse({ ...validData, firstName: 'A' });
      expect(result.success).toBe(false);
    });

    it('rejects first name longer than 50 characters', () => {
      const result = contactSchema.safeParse({ ...validData, firstName: 'A'.repeat(51) });
      expect(result.success).toBe(false);
    });

    it('rejects empty first name', () => {
      const result = contactSchema.safeParse({ ...validData, firstName: '' });
      expect(result.success).toBe(false);
    });
  });

  describe('lastName', () => {
    it('rejects last name shorter than 2 characters', () => {
      const result = contactSchema.safeParse({ ...validData, lastName: 'M' });
      expect(result.success).toBe(false);
    });

    it('rejects last name longer than 50 characters', () => {
      const result = contactSchema.safeParse({ ...validData, lastName: 'M'.repeat(51) });
      expect(result.success).toBe(false);
    });
  });

  describe('email', () => {
    it('rejects an invalid email', () => {
      const result = contactSchema.safeParse({ ...validData, email: 'not-an-email' });
      expect(result.success).toBe(false);
    });

    it('rejects empty email', () => {
      const result = contactSchema.safeParse({ ...validData, email: '' });
      expect(result.success).toBe(false);
    });

    it('accepts a valid email', () => {
      const result = contactSchema.safeParse({ ...validData, email: 'test@domain.com' });
      expect(result.success).toBe(true);
    });
  });

  describe('phone', () => {
    it('accepts undefined phone', () => {
      const result = contactSchema.safeParse({ ...validData, phone: undefined });
      expect(result.success).toBe(true);
    });

    it('accepts empty phone string', () => {
      const result = contactSchema.safeParse({ ...validData, phone: '' });
      expect(result.success).toBe(true);
    });

    it('rejects phone longer than 20 characters', () => {
      const result = contactSchema.safeParse({ ...validData, phone: '1'.repeat(21) });
      expect(result.success).toBe(false);
    });
  });

  describe('message', () => {
    it('rejects message shorter than 10 characters', () => {
      const result = contactSchema.safeParse({ ...validData, message: 'Kurz' });
      expect(result.success).toBe(false);
    });

    it('rejects message longer than 1000 characters', () => {
      const result = contactSchema.safeParse({ ...validData, message: 'A'.repeat(1001) });
      expect(result.success).toBe(false);
    });

    it('accepts message at exactly 10 characters', () => {
      const result = contactSchema.safeParse({ ...validData, message: 'A'.repeat(10) });
      expect(result.success).toBe(true);
    });

    it('accepts message at exactly 1000 characters', () => {
      const result = contactSchema.safeParse({ ...validData, message: 'A'.repeat(1000) });
      expect(result.success).toBe(true);
    });
  });

  describe('consentAccepted', () => {
    it('rejects false consent', () => {
      const result = contactSchema.safeParse({ ...validData, consentAccepted: false });
      expect(result.success).toBe(false);
    });

    it('accepts true consent', () => {
      const result = contactSchema.safeParse({ ...validData, consentAccepted: true });
      expect(result.success).toBe(true);
    });
  });

  describe('company', () => {
    it('accepts undefined company', () => {
      const result = contactSchema.safeParse({ ...validData, company: undefined });
      expect(result.success).toBe(true);
    });

    it('accepts empty company string', () => {
      const result = contactSchema.safeParse({ ...validData, company: '' });
      expect(result.success).toBe(true);
    });

    it('rejects company longer than 100 characters', () => {
      const result = contactSchema.safeParse({ ...validData, company: 'A'.repeat(101) });
      expect(result.success).toBe(false);
    });
  });

  describe('honeypot', () => {
    it('accepts undefined honeypot', () => {
      const result = contactSchema.safeParse({ ...validData, honeypot: undefined });
      expect(result.success).toBe(true);
    });

    it('accepts empty honeypot string', () => {
      const result = contactSchema.safeParse({ ...validData, honeypot: '' });
      expect(result.success).toBe(true);
    });
  });
});
