import React, {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useRef,
  useState,
} from 'react';
import Feather from './Feather';
import {useBetaFeature} from '../../hooks/useBetaFeature';
import {EncodedFeatherType, FeatherType} from './types';
import FeatherModal from './FeatherModal';
import {useDisclosure} from '@chakra-ui/react';

type CaughtFeather = {id: string; timestamp: number};

export type FeatherChaseValue = {
  caughtFeathers: CaughtFeather[];
  totalFeather: number;
  catchFeather: (featherId: string) => void;
  playerId: string;
};

const MAX_FEATHERS = 16;
const featherKey = 'f.bdeb2f22-0c5c-43e9-8d30-bc26ee0bfc8f';
const playerIdKey = 'playerId';

const getCaughtFeathers = (): CaughtFeather[] => {
  if (typeof window === 'undefined' || typeof localStorage === 'undefined') {
    return [];
  }
  try {
    return (
      JSON.parse(atob(localStorage.getItem(featherKey) || '') || '[]') || []
    );
  } catch {
    return [];
  }
};

const saveCaughtFeathers = (feathers: CaughtFeather[]) => {
  if (typeof window === 'undefined' || typeof localStorage === 'undefined') {
    return;
  }

  localStorage.setItem(featherKey, btoa(JSON.stringify(feathers)));
};

const getPlayerId = () => {
  if (typeof window === 'undefined' || typeof localStorage === 'undefined') {
    return '';
  }

  let playerId = localStorage.getItem(playerIdKey);
  if (!playerId) {
    playerId = Math.random().toString().slice(2, 10);
    localStorage.setItem(playerIdKey, playerId);
    return playerId;
  }
  return playerId;
};

export const FeatherChaseContext = createContext<FeatherChaseValue>({
  caughtFeathers: getCaughtFeathers(),
  totalFeather: 16,
  catchFeather: () => {
    /* noop */
  },
  playerId: getPlayerId(),
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
  const playerId = useRef(getPlayerId());
  const [caughtFeathers, setCaughtFeathers] = useState(getCaughtFeathers());
  const {isOpen, onOpen, onClose} = useDisclosure();

  const catchFeather = useCallback(
    (featherId: string) => {
      const caughtFeathers = getCaughtFeathers();
      if (caughtFeathers.every(f => f.id !== featherId)) {
        const newCaughtFeathers = [
          ...caughtFeathers,
          {id: featherId, timestamp: Date.now()},
        ];
        saveCaughtFeathers(newCaughtFeathers);
        setCaughtFeathers(newCaughtFeathers);
        if (typeof window.gtag !== 'undefined') {
          window.gtag('event', 'catch_feather', {
            player_id: playerId.current,
            feather_id: featherId,
          });
        }
        onOpen();
      }
    },
    [onOpen]
  );

  const featherContent = useMemo(() => {
    if (!f) {
      return null;
    }
    const content = JSON.parse(atob(f.content)) as FeatherType;

    if (caughtFeathers.find(feather => content.id === feather.id)) {
      return null;
    }

    return content;
  }, [caughtFeathers, f]);

  const value = useMemo(() => {
    return {
      caughtFeathers,
      totalFeather: MAX_FEATHERS,
      catchFeather,
      playerId: playerId.current,
    };
  }, [catchFeather, caughtFeathers]);

  return (
    <FeatherChaseContext.Provider value={value}>
      {children}
      {beta && featherContent && <Feather f={featherContent} />}
      <FeatherModal isOpen={isOpen} onClose={onClose} />
    </FeatherChaseContext.Provider>
  );
};

export default FeatherChaseProvider;
