import { createContext, useContext, useState, ReactNode } from 'react';

type ProfileImageContextType = {
  pendingImage: File | null;
  setPendingImage: (file: File | null) => void;
};

const ProfileImageContext = createContext<ProfileImageContextType | undefined>(undefined);

export function ProfileImageProvider({ children }: { children: ReactNode }) {
  const [pendingImage, setPendingImage] = useState<File | null>(null);

  return (
    <ProfileImageContext.Provider value={{ pendingImage, setPendingImage }}>
      {children}
    </ProfileImageContext.Provider>
  );
}

export const useProfileImage = () => {
  const context = useContext(ProfileImageContext);
  if (!context) {
    throw new Error('useProfileImage must be used within a ProfileImageProvider');
  }
  return context;
}; 