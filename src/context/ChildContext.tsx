import React, {createContext, useContext, useState} from 'react';

type ChildInfo = {
  name: string;
  gender: 'male' | 'female' | 'other' | '';
  age: number | null;
  image: string | null;
};

type ChildContextType = {
  childInfo: ChildInfo;
  updateChildInfo: (info: Partial<ChildInfo>) => void;
  resetChildInfo: () => void;
};

const initialChildInfo: ChildInfo = {
  name: '',
  gender: '',
  age: null,
  image: null,
};

const ChildContext = createContext<ChildContextType | undefined>(undefined);

export const ChildProvider: React.FC<{children: React.ReactNode}> = ({
  children,
}) => {
  const [childInfo, setChildInfo] = useState<ChildInfo>(initialChildInfo);

  const updateChildInfo = (info: Partial<ChildInfo>) => {
    setChildInfo(prev => ({...prev, ...info}));
  };

  const resetChildInfo = () => {
    setChildInfo(initialChildInfo);
  };

  return (
    <ChildContext.Provider value={{childInfo, updateChildInfo, resetChildInfo}}>
      {children}
    </ChildContext.Provider>
  );
};

export const useChildContext = () => {
  const context = useContext(ChildContext);
  if (context === undefined) {
    throw new Error('useChildContext must be used within a ChildProvider');
  }
  return context;
};
