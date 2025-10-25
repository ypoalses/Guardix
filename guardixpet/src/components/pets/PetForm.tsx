import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { petSchema, PetFormData } from '../../lib/validation';
import { Input } from '../ui/Input';
import { Button } from '../ui/Button';
import { useTranslation } from 'react-i18next';

interface PetFormProps {
  onSubmit: (data: any) => Promise<void>;
  defaultValues?: Partial<PetFormData>;
  isLoading?: boolean;
}

export const PetForm: React.FC<PetFormProps> = ({ onSubmit, defaultValues, isLoading }) => {
  const { t } = useTranslation();
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(petSchema),
    defaultValues,
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <Input {...register('name')} label={t('pets.petName')} error={errors.name?.message} />
      <select {...register('type')} className="w-full px-3 py-2 border rounded-lg">
        <option value="dog">Dog</option>
        <option value="cat">Cat</option>
        <option value="bird">Bird</option>
        <option value="other">Other</option>
      </select>
      <Input {...register('breed')} label={t('pets.breed')} error={errors.breed?.message} />
      <Input {...register('age', { valueAsNumber: true })} label={t('pets.age')} type="number" error={errors.age?.message} />
      <Input {...register('color')} label={t('pets.color')} error={errors.color?.message} />
      <Input {...register('description')} label={t('pets.description')} error={errors.description?.message} />
      <Button type="submit" isLoading={isLoading} className="w-full">{t('common.save')}</Button>
    </form>
  );
};
