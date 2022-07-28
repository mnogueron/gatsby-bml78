import React from 'react';
import PreviewStyleProvider from './PreviewStyleProvider';
import {
  Box,
  IconButton,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverHeader,
  PopoverTrigger,
  Text,
} from '@chakra-ui/react';
import { MdBugReport } from 'react-icons/md';
import Image from '../components/Image';

const withPreviewWrapper = (Component) => {
  const WrapperComponent = (props) => {
    const data = props.entry.getIn(['data']).toJS();

    if (data) {
      const { seo } = data;

      const titleTemplate = seo?.titleTemplate || '%s | BML';
      const title = titleTemplate.replace(
        '%s',
        seo?.title || data.heading || 'Badminton Maisons-Laffitte'
      );
      const description =
        seo?.description ||
        data.subheading ||
        'Retrouvez toutes les actus et info du club de badminton de Maisons-Laffitte';
      const image = seo?.image || '/assets/bml-icon.png';

      return (
        <PreviewStyleProvider>
          <Component {...props} data={data} />
          <Popover>
            <PopoverTrigger>
              <IconButton
                aria-label={'SEO'}
                colorScheme="blue"
                position="fixed"
                borderRadius="50%"
                icon={<MdBugReport />}
                bottom={4}
                left={4}
              />
            </PopoverTrigger>
            <PopoverContent width="md">
              <PopoverArrow />
              <PopoverCloseButton />
              <PopoverHeader>Aperçu partage</PopoverHeader>
              <PopoverBody>
                <Box
                  border="1px solid"
                  borderRadius={4}
                  borderColor={'gray.200'}
                >
                  <Box
                    as={Image}
                    /*image={{url: 'https://static.actu.fr/uploads/2018/06/25435-180625142930290-0-960x640.jpg'}}*/
                    image={{ url: image }}
                    objectFit="cover"
                    width="100%"
                    height={200}
                  />
                  <Box borderTop="1px solid" borderColor={'gray.200'} px={2}>
                    <Text fontWeight="semibold">{title}</Text>
                    <Text fontSize="sm">{description}</Text>
                  </Box>
                </Box>
              </PopoverBody>
            </PopoverContent>
          </Popover>
        </PreviewStyleProvider>
      );
    } else {
      return <div>Loading...</div>;
    }
  };

  return WrapperComponent;
};

export default withPreviewWrapper;
