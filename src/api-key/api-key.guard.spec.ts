import { ExecutionContext } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { ApiKeyGuard } from './api-key.guard';

describe('ApiKeyGuard', () => {
  let guard: ApiKeyGuard;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ApiKeyGuard],
    }).compile();

    guard = module.get<ApiKeyGuard>(ApiKeyGuard);
  });

  it('should allow access with correct API key', () => {
    process.env.API_KEY = 'correct-key';
    const context = {
      switchToHttp: () => ({
        getRequest: () => ({ headers: { 'api-key': 'correct-key' } }),
      }),
    } as unknown as ExecutionContext;

    expect(guard.canActivate(context)).toBeTruthy();
  });

  it('should throw UnauthorizedException if API key is missing', () => {
    process.env.API_KEY = 'some-key';

    const context = {
      switchToHttp: () => ({
        getRequest: () => ({ headers: {} }),
      }),
    } as unknown as ExecutionContext;

    expect(() => guard.canActivate(context)).toThrow('API key is missing.');
  });

  it('should throw UnauthorizedException if API key is incorrect', () => {
    process.env.API_KEY = 'correct-key';

    const context = {
      switchToHttp: () => ({
        getRequest: () => ({ headers: { 'api-key': 'incorrect-key' } }),
      }),
    } as unknown as ExecutionContext;

    expect(() => guard.canActivate(context)).toThrow('Invalid API key.');
  });
});
