import React, {useMemo} from 'react';
import {BoxProps, Center, Heading} from '@chakra-ui/react';
import * as dateFns from 'date-fns';

type DateBadgeProps = {
  date: Date;
} & BoxProps;

const DateBadge = ({date, ...rest}: DateBadgeProps) => {
  const label = useMemo(() => dateFns.format(date, 'dd/MM'), [date]);
  return (
    <Center
      width={{base: 12, md: 16}}
      padding={2}
      bg="white"
      borderRadius={8}
      boxShadow="md"
      {...rest}
    >
      <Heading
        overflowWrap="anywhere"
        textAlign="center"
        textTransform="uppercase"
        fontSize="md"
      >
        {label}
      </Heading>
    </Center>
  );
};

export default DateBadge;
