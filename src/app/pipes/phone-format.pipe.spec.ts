import { PhoneFormatPipe } from './phone-format.pipe';

describe('PhoneFormatPipe', () => {

  const pipe = new PhoneFormatPipe();

  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('Returns the default value', () => {
    const res = pipe.transform(null);
    expect(res).toBe('');
  });

  it('Returns the value in telephone format', () => {
    const res = pipe.transform('999888777');
    expect(res).toBe('999 - 888 - 777');
  });
});
