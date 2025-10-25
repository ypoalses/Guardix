export const APP_NAME = 'GuardixPet';

export const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
export const SOCKET_URL = import.meta.env.VITE_SOCKET_URL || 'http://localhost:5000';

export const GOOGLE_CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID;
export const FACEBOOK_APP_ID = import.meta.env.VITE_FACEBOOK_APP_ID;

export const MAP_TILE_URL = import.meta.env.VITE_MAP_TILE_URL || 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';

export const PET_TYPES = ['dog', 'cat', 'bird', 'other'] as const;

export const TAG_STATUS = ['pending', 'active', 'inactive'] as const;

export const SUPPORTED_LANGUAGES = [
  { code: 'en', name: 'English' },
  { code: 'af', name: 'Afrikaans' },
  { code: 'zu', name: 'Zulu' },
] as const;

export const THEME_OPTIONS = ['light', 'dark', 'system'] as const;

export const PASSWORD_MIN_LENGTH = 8;
export const TAG_ID_LENGTH = 12;

export const TOAST_DURATION = 3000;
export const DEBOUNCE_DELAY = 300;

export const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
export const ACCEPTED_IMAGE_TYPES = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
