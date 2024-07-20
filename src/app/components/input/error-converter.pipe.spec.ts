import { ErrorConverterPipe } from './error-converter.pipe';

describe('ErrorConverterPipe', () => {
  it('create an instance', () => {
    const pipe = new ErrorConverterPipe();
    expect(pipe).toBeTruthy();
  });
});
