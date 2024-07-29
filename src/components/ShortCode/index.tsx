import React, {useMemo} from 'react';
import {Box, BoxProps} from '@chakra-ui/react';
import ShortcodeMatchers from './matchers';

const ShortCode = ({children, ...props}: BoxProps) => {
  const shortcodeMatch = useMemo(() => {
    const value =
      typeof children === 'string'
        ? children
        : Array.isArray(children) &&
            children[0] &&
            typeof children[0] === 'string'
          ? children[0]
          : undefined;
    if (!value) {
      return;
    }

    let found = false;
    let i = 0;
    while (i < ShortcodeMatchers.length && !found) {
      const match = value.match(ShortcodeMatchers[i].regex);
      if (match) {
        found = true;
        return {
          Component: ShortcodeMatchers[i].component,
          props: ShortcodeMatchers[i].getProps(match),
        };
      }
      i++;
    }
  }, [children]);

  if (shortcodeMatch) {
    const {Component, props} = shortcodeMatch;
    return <Component {...props} />;
  }

  return (
    <Box as="code" {...props}>
      {children}
    </Box>
  );
};

export default ShortCode;
