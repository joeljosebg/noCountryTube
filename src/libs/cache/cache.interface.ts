export interface CacheServiceInterface {
  get(key: string): Promise<any>;
  set(key: string, value: any, ttl: number): Promise<void>;
  del(key: string): Promise<void>;
  reset(): Promise<void>;
}
