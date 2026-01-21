'use client';

import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';

const Scene = dynamic(() => import('@/components/Scene'), { ssr: false });

export default function Home() {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  return (
    <main>
      <Scene />
    </main>
  );
}
