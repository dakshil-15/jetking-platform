'use client';

import { useEffect, useRef } from 'react';
import { usePersona } from '@/persona/PersonaProvider';

export function FranchiseViewTracker() {
  const { record } = usePersona();
  const firedRef = useRef(false);

  useEffect(() => {
    if (firedRef.current) return;
    firedRef.current = true;
    record({ kind: 'franchise-view' });
  }, [record]);

  return null;
}
