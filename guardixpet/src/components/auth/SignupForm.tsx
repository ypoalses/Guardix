import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { signupSchema, SignupFormData } from '../../lib/validation';
import { useAuth } from '../../hooks/useAuth';
import { Input } from '../ui/Input';
import { Button } from '../ui/Button';
import { PasswordStrength } from '../ui/PasswordStrength';
import { useTranslation } from 'react-i18next';

export const SignupForm: React.FC = () => {
  const { t } = useTranslation();
  const { signup, isLoading } = useAuth();
  const [password, setPassword] = useState('');
  const { register, handleSubmit, formState: { errors } } = useForm<SignupFormData>({
    resolver: zodResolver(signupSchema),
  });

  const onSubmit = async (data: SignupFormData) => {
    try {
      await signup(data);
    } catch (error) {
      // Error handled by useAuth hook
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <Input
        {...register('name')}
        label="Name"
        error={errors.name?.message}
      />
      <Input
        {...register('email')}
        label={t('auth.email')}
        type="email"
        error={errors.email?.message}
      />
      <div>
        <Input
          {...register('password')}
          label={t('auth.password')}
          type="password"
          error={errors.password?.message}
          onChange={(e) => setPassword(e.target.value)}
        />
        <PasswordStrength password={password} />
      </div>
      <Input
        {...register('confirmPassword')}
        label={t('auth.confirmPassword')}
        type="password"
        error={errors.confirmPassword?.message}
      />
      <Button type="submit" isLoading={isLoading} className="w-full">
        {t('auth.signup')}
      </Button>
    </form>
  );
};
