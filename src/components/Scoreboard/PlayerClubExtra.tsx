import React from 'react';
import {Text, TextProps} from '@chakra-ui/react';

type PlayerClubExtraProps = {
  club: string;
} & TextProps;

const PlayerClubExtra = ({club, ...rest}: PlayerClubExtraProps) => {
  return (
    <Text
      display={{base: 'none', md: 'inline'}}
      as="span"
      fontSize={{base: 'xs', md: 'sm'}}
      color="gray.500"
      {...rest}
    >{`(${club})`}</Text>
  );
};

export default PlayerClubExtra;
