import React from 'react';
import { Modal } from '../ui/Modal';
import { Button } from '../ui/Button';
import { useTranslation } from 'react-i18next';

interface ClonePetModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  petName: string;
}

export const ClonePetModal: React.FC<ClonePetModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  petName,
}) => {
  const { t } = useTranslation();

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={t('pets.clonePet')}>
      <div className="space-y-4">
        <p>Clone profile for {petName}?</p>
        <div className="flex gap-2">
          <Button onClick={onConfirm} className="flex-1">{t('common.confirm')}</Button>
          <Button onClick={onClose} variant="secondary" className="flex-1">{t('common.cancel')}</Button>
        </div>
      </div>
    </Modal>
  );
};
