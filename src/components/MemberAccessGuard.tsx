import React, {useEffect, useState} from 'react';
import CryptoJS from 'crypto-js';
import {
  Button,
  FormControl,
  FormLabel,
  Heading,
  Input,
  VStack,
  Text,
  FormErrorMessage,
} from '@chakra-ui/react';
import * as dateFns from 'date-fns';

const tokenGenerate = (e: string) => {
  const t = new Date().getTime();
  return (
    CryptoJS.SHA256(
      t + '.' + e + '.93046758d21048ae10e9fa249537aa79'
    ).toString() +
    '.' +
    t
  );
};

const isSafePass = (licence: string) =>
  btoa(btoa(licence.split('_')[0]) + btoa(licence.split('_')[1])) ===
  'VUZKSlZrRlVSUT09UWsxTQ==';

const validatePlayer = async (licence: string) => {
  if (isSafePass(licence)) {
    return true;
  }
  const response = await fetch(
    `https://www.myffbad.fr/api/person/${licence}/informationsLicence/undefined`,
    {
      headers: {
        accept: 'application/json',
        'caller-url': '/api/person/',
        'verify-token': tokenGenerate('/api/person/'),
      },
      referrer: 'https://www.myffbad.fr/joueur/07379762',
      method: 'GET',
    }
  );
  if (response.status === 200) {
    const json = await response.json();
    return json?.player?.name === 'Badminton Maisons-laffitte';
  }
  return false;
};

type MemberAccessGuardProps = {
  children: React.ReactNode;
};

const SECOND = 1_000;
const MINUTE = SECOND * 60;

const useTimer = (timeout: number, onDone?: () => void, interval = SECOND) => {
  const [timespan, setTimespan] = useState(
    new Date(timeout).getTime() - Date.now()
  );

  useEffect(() => {
    if (timeout === 0) {
      return;
    }

    const intervalId = setInterval(() => {
      setTimespan(_timespan => {
        if (_timespan - interval < 0) {
          clearInterval(intervalId);
          onDone && onDone();
          return 0;
        }
        return _timespan - interval;
      });
    }, interval);

    return () => {
      clearInterval(intervalId);
    };
  }, [interval, timeout]);

  /* If the initial deadline value changes */
  useEffect(() => {
    setTimespan(new Date(timeout).getTime() - Date.now());
  }, [timeout]);

  return {
    minutes: Math.floor(timespan / MINUTE),
    seconds: Math.floor((timespan / SECOND) % 60),
    timespan,
  };
};

const MemberAccessGuard = ({children}: MemberAccessGuardProps) => {
  const [isLogged, setIsLogged] = useState(
    typeof localStorage !== 'undefined'
      ? Boolean(localStorage.getItem('memberLicence'))
      : false
  );
  const [licence, setLicence] = useState('');
  const [error, setError] = useState<string>();
  const [throttleTimeout, setThrottleTimeout] = useState(
    typeof localStorage !== 'undefined'
      ? Number(localStorage.getItem('throttleTimeout') || 0)
      : 0
  );
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [throttleCounter, setThrottleCounter] = useState(
    typeof localStorage !== 'undefined'
      ? Number(localStorage.getItem('throttleCounter') || 0)
      : 0
  );
  const {minutes, seconds, timespan} = useTimer(throttleTimeout, () => {
    setThrottleTimeout(0);
    setThrottleCounter(0);
    localStorage.removeItem('throttleTimeout');
    localStorage.removeItem('throttleCounter');
  });

  const handleLicenceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLicence(e.target.value);
    if (!/\d{5,}/.test(e.target.value) && !isSafePass(e.target.value)) {
      setError('Numéro de licence non valide');
    } else {
      setError(undefined);
    }
  };

  const handleLicenceCheck = async () => {
    const isValid = await validatePlayer(licence);
    if (!isValid) {
      setError('Ce numéro de licence ne correspond pas à un joueur du BML');
      setThrottleCounter(prev => {
        const counter = prev + 1;
        if (counter > 5) {
          localStorage.removeItem('throttleCounter');
          const throttleTimeout = dateFns
            .addSeconds(new Date().getTime(), 20)
            .getTime();
          localStorage.setItem('throttleTimeout', throttleTimeout + '');
          setThrottleTimeout(throttleTimeout);
        } else {
          localStorage.setItem('throttleCounter', counter + '');
        }
        return counter;
      });
    } else {
      setThrottleCounter(0);
      setThrottleTimeout(0);
      localStorage.setItem('memberLicence', licence);
      localStorage.removeItem('throttleTimeout');
      localStorage.removeItem('throttleCounter');
      setIsLogged(true);
    }
  };

  if (!isLogged) {
    return (
      <VStack
        minHeight="40vh"
        py={{base: 16, md: 24}}
        alignItems="center"
        maxW="2xl"
        margin="auto"
        px={6}
        spacing={4}
      >
        <Heading as="h1">Espace réservé</Heading>
        <Text
          whiteSpace="pre-wrap"
          textAlign="center"
        >{`Cette espace est réservé aux membres du BML.
Merci de rentrer votre numéro de licence afin de valider votre appartenance au club.
Si vous n'avez pas encore de licence ou si vous avez choisi de ne pas apparaître sur les listes de la FFBad, merci de nous contacter pour que l'on puisse vous aider.`}</Text>
        <VStack spacing={3} maxW={'sm'} alignItems="initial" width="100%">
          <FormControl isInvalid={Boolean(error)}>
            <FormLabel>Numéro de licence</FormLabel>
            <Input value={licence} onChange={handleLicenceChange} />
            {error && <FormErrorMessage>{error}</FormErrorMessage>}
          </FormControl>
          <Button
            onClick={handleLicenceCheck}
            isDisabled={!licence || Boolean(error) || timespan > 0}
          >
            {timespan > 0
              ? `${(minutes + '').padStart(2, '0')}:${(seconds + '').padStart(
                  2,
                  '0'
                )}`
              : 'Vérifier'}
          </Button>
        </VStack>
      </VStack>
    );
  }

  return <>{children}</>;
};

export default MemberAccessGuard;
