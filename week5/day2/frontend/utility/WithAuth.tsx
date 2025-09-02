'use client'; // <-- add this line at the very top

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation'; // note: Next 13+ uses next/navigation

const withAuth = (WrappedComponent: any) => {
  return (props: any) => {
    const router = useRouter();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
      setMounted(true);
      const token = localStorage.getItem('token');
      if (!token) {
        router.replace('/auth/login');
      }
    }, [router]);

    if (!mounted) return null;

    return <WrappedComponent {...props} />;
  };
};

export default withAuth;
