import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { twoFactorSchema, TwoFactorFormData } from '../../lib/validation';
import { useAuth } from '../../hooks/useAuth';
import { Input } from '../ui/Input';
import { Button } from '../ui/Button';
import { useTranslation } from 'react-i18next';

interface TwoFactorAuthProps {
  token: string;
}

export const TwoFactorAuth: React.FC<TwoFactorAuthProps> = ({ token }) => {
  const { t } = useTranslation();
  const { verifyTwoFactor, isLoading } = useAuth();
  const { register, handleSubmit, formState: { errors } } = useForm<TwoFactorFormData>({
    resolver: zodResolver(twoFactorSchema),
  });

  const onSubmit = async (data: TwoFactorFormData) => {
    try {
      await verifyTwoFactor(data.code, token);
    } catch (error) {
      // Error handled by useAuth hook
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <p className="text-sm text-gray-600 dark:text-gray-400">
        {t('auth.enterCode')}
      </p>
      <Input
        {...register('code')}
        label={t('auth.twoFactorCode')}
        maxLength={6}
        error={errors.code?.message}
        placeholder="000000"
      />
      <Button type="submit" isLoading={isLoading} className="w-full">
        {t('common.confirm')}
      </Button>
    </form>
  );
};
