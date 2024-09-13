import React from 'react';
import {Button, ButtonProps} from '@chakra-ui/react';

type PaginationButtonProps = {
  page: number;
  onPageClick: (page: number) => void;
  isActive: boolean;
} & ButtonProps;

const PaginationButton = ({
  isActive,
  page,
  onPageClick,
  ...rest
}: PaginationButtonProps) => {
  const handleClick = () => {
    onPageClick(page);
  };

  return (
    <Button
      key={page}
      colorScheme="red"
      aria-label={`Aller à la page numéro ${page}`}
      color={isActive ? 'text.inverted.main' : 'text.main'}
      variant={isActive ? 'solid' : 'ghost'}
      bg={isActive ? 'red.600' : undefined}
      onClick={handleClick}
      px={'1 !important'}
      {...rest}
    >
      {page}
    </Button>
  );
};

export default PaginationButton;
