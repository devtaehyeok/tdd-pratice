describe('hello world test : 2+2 Calculation', () => {
  it('2+2 ==4', () => {
    expect(2 + 2).toBe(4);
  });
  it('2+2 is not 5', () => {
    expect(2 + 2).not.toBe(5);
  });

  it('mock function basic', () => {
    const mockFunction = jest.fn();
    mockFunction();
    mockFunction('hello');
    expect(mockFunction).toBeCalledWith('hello');
    expect(mockFunction).toBeCalledTimes(2);
  });
});
