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
import {MdBugReport} from 'react-icons/md';
import Image from '../components/Image';
import format from 'date-fns/format';
import frLocale from 'date-fns/locale/fr';

const getSEOData = data => {
  switch (data.templateKey) {
    case 'article-page':
    case 'tournament-page':
      return {
        title: data.title,
        description: data.body?.slice(0, 140) + '...',
        image: data.featuredimage?.image,
        article: true,
      };
    case 'all-results-page':
    case 'articles-page':
    case 'contact-page':
    case 'content-page':
    case 'boutique-page':
    case 'board-chart-page':
    case 'index-page':
      return {
        title: data.title,
        description: data.subheading,
      };
    case 'result-page': {
      const date = format(new Date(data.date), 'PP', {locale: frLocale});
      return {
        title: data.heading,
        description: data.subheading || `${data.heading} - ${date}`,
        image:
          data.featuredimage.image !== '/assets/shuttle.jpg'
            ? data.featuredimage.image
            : undefined,
        article: true,
      };
    }
    case 'results-page':
      return {
        title: data.heading,
        description: data.subheading,
      };
    default:
      return {};
  }
};

const withPreviewWrapper = Component => {
  const WrapperComponent = props => {
    const data = props.entry.getIn(['data']).toJS();
    //const pageContext = props.entry.getIn(['pageContext']).toJS();

    if (data) {
      const {seo: override} = data;

      const templateSeo = getSEOData(data);

      const titleTemplate = override?.titleTemplate || '%s - BML';
      const title = titleTemplate.replace(
        '%s',
        override?.title || templateSeo?.title || 'Badminton Maisons-Laffitte'
      );
      const description =
        override?.description ||
        templateSeo?.description ||
        'Retrouvez toutes les actus et info du club de badminton de Maisons-Laffitte';
      const image =
        override?.image || templateSeo?.image || '/assets/bml-icon.png';

      return (
        <PreviewStyleProvider>
          <Component {...props} data={data} />
          <Popover placement="top-end">
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
                    image={{url: image}}
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
