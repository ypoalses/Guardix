import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { loginSchema, LoginFormData } from '../../lib/validation';
import { useAuth } from '../../hooks/useAuth';
import { Input } from '../ui/Input';
import { Button } from '../ui/Button';
import { useTranslation } from 'react-i18next';

export const LoginForm: React.FC = () => {
  const { t } = useTranslation();
  const { login, isLoading } = useAuth();
  const { register, handleSubmit, formState: { errors } } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormData) => {
    try {
      await login(data);
    } catch (error) {
      // Error handled by useAuth hook
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <Input
        {...register('email')}
        label={t('auth.email')}
        type="email"
        error={errors.email?.message}
        placeholder="you@example.com"
      />
      <Input
        {...register('password')}
        label={t('auth.password')}
        type="password"
        error={errors.password?.message}
      />
      <div className="flex items-center">
        <input
          {...register('rememberMe')}
          type="checkbox"
          className="mr-2"
        />
        <label className="text-sm">{t('auth.rememberMe')}</label>
      </div>
      <Button type="submit" isLoading={isLoading} className="w-full">
        {t('auth.login')}
      </Button>
    </form>
  );
};
