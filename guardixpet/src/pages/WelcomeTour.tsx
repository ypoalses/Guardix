import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/Button';

export const WelcomeTour: React.FC = () => {
  const [step, setStep] = useState(0);
  const navigate = useNavigate();

  const steps = [
    { title: 'Welcome to GuardixPet', description: 'Manage your pet tags easily' },
    { title: 'Add Your Pets', description: 'Create profiles for all your pets' },
    { title: 'Track Scans', description: 'Get notified when your pet is scanned' },
  ];

  const handleNext = () => {
    if (step < steps.length - 1) {
      setStep(step + 1);
    } else {
      navigate('/home');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 px-4">
      <div className="max-w-md w-full text-center space-y-6">
        <h1 className="text-3xl font-bold">{steps[step].title}</h1>
        <p className="text-gray-600 dark:text-gray-400">{steps[step].description}</p>
        <Button onClick={handleNext} className="w-full">
          {step < steps.length - 1 ? 'Next' : 'Get Started'}
        </Button>
      </div>
    </div>
  );
};
