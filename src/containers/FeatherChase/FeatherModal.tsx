import React, {useMemo} from 'react';
import {
  Heading,
  Icon,
  IconButton,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
} from '@chakra-ui/react';
import {TypeAnimation} from 'react-type-animation';
import {useFeatherChaseContext} from './FeatherChaseProvider';
import {FiCheckCircle} from 'react-icons/fi';

type FeatherModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

const getFeatherMessage = (totalFeather: number, caughtFeather: number) => {
  const remainingFeathers = totalFeather - caughtFeather;
  let title = 'Bien joué !';
  let description = `Tu as trouvé un des ${totalFeather} morceaux de plumes de notre mascotte ! Encore ${remainingFeathers} morceau${
    remainingFeathers > 1 ? 'x' : ''
  } à trouver.`;

  switch (caughtFeather) {
    case 1: {
      title = 'Belle découverte !';
      description = `Tu as trouvé ton premier morceau de plume ! Encore ${remainingFeathers} morceau${
        remainingFeathers > 1 ? 'x' : ''
      } à trouver.`;
      break;
    }
  }

  return {
    title,
    description,
  };
};

const FeatherModal = ({isOpen, onClose}: FeatherModalProps) => {
  const {caughtFeathers, totalFeather} = useFeatherChaseContext();
  const {title, description} = useMemo(
    () => getFeatherMessage(totalFeather, caughtFeathers.length),
    [caughtFeathers, totalFeather]
  );
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      isCentered={true}
      size={{base: 'xs', md: 'sm', lg: 'md'}}
    >
      <ModalOverlay />
      <ModalContent bg="blackAlpha.800">
        <ModalHeader pb={2}>
          <Heading
            as="h3"
            color="text.inverted.main"
            fontSize={{base: 'lg', sm: 'xl', md: '2xl'}}
            fontFamily={'VT323, monospace'}
          >
            {title}
          </Heading>
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Text
            color="text.inverted.main"
            fontSize={{base: 'lg', sm: 'xl'}}
            fontFamily={'VT323, monospace'}
            lineHeight="short"
          >
            <TypeAnimation
              sequence={[description]}
              wrapper="span"
              speed={60}
              cursor={false}
            />
          </Text>
        </ModalBody>

        <ModalFooter pt={2}>
          <IconButton
            aria-label={'fermer le dialog de decouverte de plume'}
            icon={<Icon as={FiCheckCircle} />}
            onClick={onClose}
            colorScheme="whiteAlpha"
          />
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default FeatherModal;
