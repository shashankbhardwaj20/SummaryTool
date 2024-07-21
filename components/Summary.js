import { Box, Heading, Text } from '@chakra-ui/react'

export default function Summary({ summary }) {
  return (
    <Box borderWidth={1} borderRadius="lg" p={4}>
      <Heading as="h2" size="md" mb={2}>
        Summary
      </Heading>
      <Text>{summary}</Text>
    </Box>
  )
}