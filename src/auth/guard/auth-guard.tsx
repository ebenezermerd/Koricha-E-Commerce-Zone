import { useState, useEffect, useCallback } from 'react';

import { paths } from 'src/routes/paths';
import { useRouter, usePathname, useSearchParams } from 'src/routes/hooks';

import { CONFIG } from 'src/config-global';

import  LoadingScreen  from 'src/components/loading-screen';

import { useGetUser } from 'src/services/useUser';

// ----------------------------------------------------------------------

type Props = {
  children: React.ReactNode;
};

export function AuthGuard({ children }: Props) {
  const router = useRouter();

  const pathname = usePathname();

  const searchParams = useSearchParams();

  const { authenticated, userLoading } = useGetUser();

  const [isChecking, setIsChecking] = useState<boolean>(true);

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set(name, value);

      return params.toString();
    },
    [searchParams]
  );

  const checkPermissions = useCallback(async (): Promise<void> => {
    if (userLoading) {
      return;
    }

    if (!authenticated) {
      const { method } = CONFIG.auth;

      const signInPath = {
        jwt: paths.auth.jwt.signIn,
      }[method];

      const href = `${signInPath}?${createQueryString('returnTo', pathname)}`;

      router.replace(href);
      return;
    }

    setIsChecking(false);
  }, [authenticated, userLoading, pathname, router, createQueryString]);

  useEffect(() => {
    checkPermissions();
  }, [checkPermissions]);

  if (isChecking || userLoading) {
    return <LoadingScreen />;
  }

  return <>{children}</>;
}
