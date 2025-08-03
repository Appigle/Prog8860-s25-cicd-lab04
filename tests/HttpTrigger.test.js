// Mock the Azure Functions app before importing
jest.mock('@azure/functions', () => ({
  app: {
    http: jest.fn(),
  },
}));

describe('HttpTrigger Function', () => {
  let handler;
  let mockRequest;
  let mockContext;

  beforeAll(() => {
    require('../src/functions/HttpTrigger.js');
    const httpCall = require('@azure/functions').app.http.mock.calls[0];
    handler = httpCall[1].handler;
  });

  beforeEach(() => {
    jest.clearAllMocks();
    mockRequest = {
      url: 'http://localhost:7071/api/HttpTrigger',
      query: {
        get: jest.fn().mockReturnValue(null),
      },
      text: jest.fn().mockResolvedValue(''),
    };

    mockContext = {
      log: jest.fn(),
    };
  });

  test('should return hello world when no name provided', async () => {
    const result = await handler(mockRequest, mockContext);

    expect(result.body).toBe('Hello, world!');
    expect(mockContext.log).toHaveBeenCalledWith(
      'Http function processed request for url "http://localhost:7071/api/HttpTrigger"'
    );
  });

  test('should return personalized message when name provided in query', async () => {
    mockRequest.query.get.mockReturnValue('Ray');

    const result = await handler(mockRequest, mockContext);

    expect(result.body).toBe('Hello, Ray!');
  });

  test('should return personalized message when name provided in body', async () => {
    mockRequest.text.mockResolvedValue('Ray');

    const result = await handler(mockRequest, mockContext);

    expect(result.body).toBe('Hello, Ray!');
  });

  test('should log the request URL', async () => {
    await handler(mockRequest, mockContext);

    expect(mockContext.log).toHaveBeenCalledWith(
      'Http function processed request for url "http://localhost:7071/api/HttpTrigger"'
    );
  });
});
