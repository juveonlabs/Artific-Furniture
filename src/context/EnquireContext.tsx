import { createContext, useContext, useState, type ReactNode } from 'react';

interface EnquireContextValue {
  open: (productName: string) => void;
  close: () => void;
  isOpen: boolean;
  productName: string;
}

const EnquireContext = createContext<EnquireContextValue | null>(null);

export function EnquireProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [productName, setProductName] = useState('');

  const open = (name: string) => {
    setProductName(name);
    setIsOpen(true);
  };

  const close = () => setIsOpen(false);

  return (
    <EnquireContext.Provider value={{ open, close, isOpen, productName }}>
      {children}
    </EnquireContext.Provider>
  );
}

export function useEnquire() {
  const ctx = useContext(EnquireContext);
  if (!ctx) throw new Error('useEnquire must be used inside EnquireProvider');
  return ctx;
}
