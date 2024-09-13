import React, {useMemo} from 'react';
import {BoxProps, HStack, Icon, IconButton} from '@chakra-ui/react';
import {
  FiChevronLeft,
  FiChevronRight,
  FiChevronsLeft,
  FiChevronsRight,
} from 'react-icons/fi';
import PaginationButton from './PaginationButton';

type PaginationProps = {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  showQuickNavButtons?: boolean;
} & BoxProps;

const MAX_VISIBLE_RANGE = 5;

// TODO simplify
const Pagination = ({
  currentPage,
  totalPages,
  onPageChange,
  showQuickNavButtons,
  ...rest
}: PaginationProps) => {
  const paginationRange = useMemo(() => {
    const maxRangeSize = Math.min(totalPages, MAX_VISIBLE_RANGE);

    let rangeStart = Math.max(1, currentPage - Math.floor(maxRangeSize / 2));
    let rangeEnd = rangeStart + maxRangeSize - 1;

    if (rangeEnd > totalPages) {
      rangeEnd = totalPages;
      rangeStart = Math.max(1, rangeEnd - maxRangeSize + 1);
    }

    return Array.from({length: maxRangeSize}, (_, i) => i + rangeStart);
  }, [currentPage, totalPages]);

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handleFirstPage = () => {
    onPageChange(1);
  };

  const handleLastPage = () => {
    onPageChange(totalPages);
  };

  return (
    <HStack justifyContent="center" spacing={1} {...rest}>
      {showQuickNavButtons && (
        <IconButton
          aria-label="Aller à la première page"
          colorScheme="red"
          color="text.main"
          variant="ghost"
          onClick={handleFirstPage}
          icon={<Icon as={FiChevronsLeft} boxSize={6} />}
          isDisabled={currentPage === 1}
          px={'1 !important'}
        />
      )}
      <IconButton
        aria-label="Aller à la page précédente"
        colorScheme="red"
        color="text.main"
        variant="ghost"
        onClick={handlePreviousPage}
        icon={<Icon as={FiChevronLeft} boxSize={6} />}
        isDisabled={currentPage === 1}
        px={'1 !important'}
      />

      {paginationRange.map(page => (
        <PaginationButton
          key={page}
          page={page}
          onPageClick={onPageChange}
          isActive={currentPage === page}
        />
      ))}
      <IconButton
        aria-label="Aller à la prochaine page"
        colorScheme="red"
        color="text.main"
        variant="ghost"
        onClick={handleNextPage}
        icon={<Icon as={FiChevronRight} boxSize={6} />}
        isDisabled={currentPage === totalPages}
        px={'1 !important'}
      />
      {showQuickNavButtons && (
        <IconButton
          aria-label="Aller à la dernière page"
          colorScheme="red"
          color="text.main"
          variant="ghost"
          onClick={handleLastPage}
          icon={<Icon as={FiChevronsRight} boxSize={6} />}
          isDisabled={currentPage === totalPages}
          px={'1 !important'}
        />
      )}
    </HStack>
  );
};

export default Pagination;
