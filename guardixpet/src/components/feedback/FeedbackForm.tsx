import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { feedbackSchema, FeedbackFormData } from '../../lib/validation';
import { Button } from '../ui/Button';
import { useTranslation } from 'react-i18next';

export const FeedbackForm: React.FC = () => {
  const { t } = useTranslation();
  const { register, handleSubmit, formState: { errors }, reset } = useForm<FeedbackFormData>({
    resolver: zodResolver(feedbackSchema),
  });

  const onSubmit = async (data: FeedbackFormData) => {
    console.log('Feedback:', data);
    alert(t('feedback.thankYou'));
    reset();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <label className="block text-sm font-medium mb-1">{t('feedback.message')}</label>
        <textarea
          {...register('message')}
          rows={5}
          className="w-full px-3 py-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600"
        />
        {errors.message && (
          <p className="mt-1 text-sm text-red-600">{errors.message.message}</p>
        )}
      </div>
      <Button type="submit" className="w-full">{t('feedback.submit')}</Button>
    </form>
  );
};
