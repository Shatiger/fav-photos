import { randomResponseTime } from './random-response-time';

describe('Random response time function', () => {
  beforeEach(() => {
    spyOn(window.Math, 'random').and.returnValue(0.123);
  });

  it('should create time in assigned range', () => {
    const min = 200;
    const max = 300;
    const ms = randomResponseTime();
    expect(ms >= 200 && ms <= 300).toBeTruthy();
  });
});