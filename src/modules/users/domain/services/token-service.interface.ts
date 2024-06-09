export interface TokenServiceInterface {
  generateToken(userId: string): Promise<string>;
  validateToken(userId: string, token: string): Promise<boolean>;
}
