import { debounce, createNumberRangeFromString } from './index'

jest.useFakeTimers();

describe('debounce', () => {
  let func;
  let debouncedFunc;

  beforeEach(() => {
    func = jest.fn();
    debouncedFunc = debounce(func, 1000);
  });

  test('debounce perform just once', () => {
    for (let i = 0; i < 100; i++) {
        debouncedFunc();
    }
    jest.runAllTimers();
    expect(func).toBeCalledTimes(1);
  });
});

describe('createNumberRangeFromString', () => {
  test('should return range "from" not equal to "to"', () => {
    const range1 = createNumberRangeFromString('12 - 15 years');
    const range2 = createNumberRangeFromString('13 - 16');
    
    expect(range1).toEqual({ from: 12, to: 15 });
    expect(range2).toEqual({ from: 13, to: 16 });
  });

  test('should return range "from" not equal to "to"', () => {
    const range1 = createNumberRangeFromString('12 - 12 years');
    const range2 = createNumberRangeFromString('13 - 13');
    const range3 = createNumberRangeFromString('18');
    
    expect(range1).toEqual({ from: 12, to: 12 });
    expect(range2).toEqual({ from: 13, to: 13 });
    expect(range3).toEqual({ from: 18, to: 18 });
  });
});