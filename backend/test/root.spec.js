describe('Root route test', () => {
  it('should return message hello world', async () => {
    const response = await global.testRequest.get('/');

    expect(response.status).toBe(200);
    expect(response.body).toEqual({ message: 'Hello World!' });
  });
});
