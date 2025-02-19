export type IDateValue = string | number | null;


export type UserType = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  birthdate: string | Date;
  gender: 'Male' | 'Female' | 'Other';
  streetAddress: string;
  city: string;
  zipCode: string;
  country: string;
  avatarUrl?: string;
  isVerified: boolean;
  role: 'admin' | 'supplier' | 'customer' | 'guest';
  status: 'active' | 'banned' | 'pending' | 'rejected';
  about?: string;
  createdAt: IDateValue;
  updatedAt: IDateValue;
};

export type UpdateUserPayload = {
  firstName?: string;
  lastName?: string;
  email?: string;
  phoneNumber?: string;
  birthdate: string | null;
  gender?: string;
  streetAddress?: string;
  city?: string;
  zipCode?: string;
  country?: string;
  about?: string;
  image?: File;
};

export type UpdatePasswordPayload = {
  oldPassword: string;
  newPassword: string;
  confirmNewPassword: string;
};

// Helper to transform backend user data to our format
export const transformBackendUser = (backendUser: any): UserType => ({
  id: backendUser.id,
  firstName: backendUser.firstName || '',
  lastName: backendUser.lastName || '',
  email: backendUser.email,
  phoneNumber: backendUser.phone || backendUser.phoneNumber || '',
  birthdate: backendUser.birthdate || '',
  gender: backendUser.gender || 'Other',
  streetAddress: backendUser.address || '',
  city: backendUser.city || '',
  zipCode: backendUser.zip_code || backendUser.zipCode || '',
  country: backendUser.country || '',
  avatarUrl: backendUser.avatarUrl || backendUser.image || null,
  isVerified: backendUser.isVerified || backendUser.verified === 1,
  role: backendUser.role || 'guest',
  status: backendUser.status || 'pending',
  about: backendUser.about || '',
  createdAt: backendUser.created_at || new Date().toISOString(),
  updatedAt: backendUser.updated_at || new Date().toISOString(),
}); 