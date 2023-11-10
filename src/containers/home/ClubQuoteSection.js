import React from "react";
import {Box, Container, Heading} from "@chakra-ui/react";
import ClubQuote from "./ClubQuote";

const ClubQuoteSection = ({content}) => {
	return (
		<Container maxW="7xl" my={{ base: 8, md: 12, lg: 16 }} as="section">
			<Heading as="h2" size="xl" mb={{ base: 4, lg: 8 }}>
				Le club
			</Heading>
			<Box px={{ base: 6, md: 16 }} py={{ base: 0, md: 2, lg: 4 }}>
				<ClubQuote content={content} />
			</Box>
		</Container>
	)
}

export default ClubQuoteSection;