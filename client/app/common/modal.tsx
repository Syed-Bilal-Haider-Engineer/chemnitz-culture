'use client';

import React, { useEffect, useState } from 'react';
import '../styles/modal.css';
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

  if (!portalRoot) return null; // Wait until DOM is ready

  return createPortal(
    <div id="myModal" className="modal">
      {children}
    </div>,
    portalRoot
  );
}

export default Modal;
