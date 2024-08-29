import React, {createContext, useContext, useMemo} from 'react';
import Feather from './Feather';
import {useBetaFeature} from '../../hooks/useBetaFeature';
import {EncodedFeatherType} from './types';

export type FeatherChaseValue = {
  caughtFeather: number;
  totalFeather: number;
};

export type FeatherChaseContextType = React.Context<FeatherChaseValue>;

export const FeatherChaseContext = createContext<FeatherChaseValue>({
  caughtFeather: 0,
  totalFeather: 16,
});

export const useFeatherChaseContext = () => {
  return useContext<FeatherChaseValue>(FeatherChaseContext);
};

type FeatherChaseProviderProps = {
  children: React.ReactNode;
  f: EncodedFeatherType | null;
};

const FeatherChaseProvider = ({children, f}: FeatherChaseProviderProps) => {
  const beta = useBetaFeature();
  const value = useMemo(() => {
    return {
      caughtFeather: 0,
      totalFeather: 16,
    };
  }, []);

  return (
    <FeatherChaseContext.Provider value={value}>
      {children}
      {beta && f && <Feather encodedFeather={f} />}
    </FeatherChaseContext.Provider>
  );
};

export default FeatherChaseProvider;
