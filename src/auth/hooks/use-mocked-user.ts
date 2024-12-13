import { useEffect, useState } from 'react';
import { fetcher, endpoints } from '../../utils/axios';

// ----------------------------------------------------------------------

interface User {
  id: number;
  displayName: string;
  email: string;
  photoURL: string;
  phoneNumber: string;
  country: string;
  address: string;
  state: string;
  city: string;
  zipCode: string;
  about: string;
  role: string;
  isPublic: boolean;
}

export function useMockedUser() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const data = await fetcher(endpoints.auth.me);
        setUser({
          id: data.id,
          displayName: `${data.firstName} ${data.lastName}`,
          email: data.email,
          photoURL: data.image || null,
          phoneNumber: data.phone,
          country: data.country || '',
          address: data.address,
          state: data.region || '',
          city: '', // Assuming city is part of the address
          zipCode: '', // Assuming zip code is part of the address
          about: '', // Assuming about is not provided
          role: data.role || '',
          isPublic: data.verified === 1,
        });
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  return { user, loading, error };
}