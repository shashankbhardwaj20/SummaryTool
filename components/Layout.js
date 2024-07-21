import { Box, Container, Heading } from '@chakra-ui/react'

export default function Layout({ children }) {
  return (
    <Box>
      <Box bg="gray.100" py={4}>
        <Container maxW="container.xl">
          <Heading as="h1" size="xl" textAlign="center">AI Content Summarizer</Heading>
        </Container>
      </Box>
      <Container maxW="container.xl" py={8}>
        {children}
      </Container>
    </Box>
  )
}