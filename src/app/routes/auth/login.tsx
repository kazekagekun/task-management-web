import { AuthLayout } from '../../../components/layouts/auth/AuthLayout';
import { LoginForm } from '../../../features/auth/LoginForm';

export const LoginRoute = () => {
  return (
    <AuthLayout>
      <LoginForm />
    </AuthLayout>
  );
};
