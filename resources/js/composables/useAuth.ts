import { router } from '@inertiajs/vue3';
import { LoginForm } from '@/schemas/auth';

export class AuthService {
  private static instance: AuthService;

  private constructor() {}

  public static getInstance(): AuthService {
    if (!AuthService.instance) {
      AuthService.instance = new AuthService();
    }
    return AuthService.instance;
  }

  public async login(form: LoginForm): Promise<void> {
    try {
      await router.post('/login', form);
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  }

  public async logout(): Promise<void> {
    try {
      await router.post('/logout');
    } catch (error) {
      console.error('Logout error:', error);
      throw error;
    }
  }
}

// Singleton instance
export const useAuth = () => AuthService.getInstance();
