import React from 'react';
import { useEffect } from 'react';
import useCheckAuth from '../hooks/useCheckAuth';

interface AuthProps {
  children: React.ReactNode;
}

export default function Auth({ children }: AuthProps) {
  const { auth } = useCheckAuth();

  useEffect(() => {
    auth();
  }, []);

  return <>{children}</>;
}
