import React, {useState} from 'react';
import {Box, BoxProps, Center, CircularProgress} from '@chakra-ui/react';

type IFrameProps = BoxProps;

const IFrame = ({...props}: IFrameProps) => {
  const [isLoading, setIsLoading] = useState(true);
  return (
    <Box position="relative">
      <Box
        as="iframe"
        width="100%"
        borderStyle="solid"
        borderWidth="2px"
        borderColor="red.600"
        borderRadius="lg"
        onLoad={() => setIsLoading(false)}
        {...props}
      />
      {isLoading && (
        <Center
          position="absolute"
          top={0}
          bottom={0}
          left={0}
          right={0}
          pointerEvents="none"
        >
          <CircularProgress isIndeterminate color="red.600" size={12} />
        </Center>
      )}
    </Box>
  );
};

export default IFrame;
