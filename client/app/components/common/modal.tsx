'use client';

import React, { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';

interface ModalProps {
  children: React.ReactNode;
}

function Modal({ children }: ModalProps) {
  const [portalRoot, setPortalRoot] = useState<HTMLElement | null>(null);

  useEffect(() => {
    const el = document.getElementById('react-portal');
    setPortalRoot(el);
  }, []);

  if (!portalRoot) return null; 

  return createPortal(
    <div id="myModal"
      className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900 bg-opacity-50 px-4 sm:px-6">
      {children}
    </div>,
    portalRoot
  );
}

export default Modal;
