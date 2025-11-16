import type { IDataRepository } from './interfaces';
import { MockDataRepository } from './MockDataRepository';
type RepositoryType = 'mock' | 'real';
// Factory to create the appropriate repository based on environment
export class RepositoryFactory {
  private static instance: IDataRepository | null = null;
  static getRepository(type: RepositoryType = 'mock'): IDataRepository {
    if (!this.instance) {
      switch (type) {
        case 'mock':
          this.instance = new MockDataRepository();
          break;
        case 'real':
          // TODO: Implement RealDataRepository when backend is ready
          throw new Error('Real data repository not implemented yet');
        default:
          throw new Error(`Unknown repository type: ${type}`);
      }
    }
    return this.instance;
  }
  static resetRepository(): void {
    this.instance = null;
  }
}
// Export convenience function
export const getRepository = (type: RepositoryType = 'mock') => RepositoryFactory.getRepository(type);