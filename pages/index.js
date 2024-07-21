import { useState } from 'react'
import { Box, VStack } from '@chakra-ui/react'
import Layout from '../components/Layout'
import UploadForm from '../components/UploadForm'
import Summary from '../components/Summary'

export default function Home() {
  const [summary, setSummary] = useState(null)

  return (
    <Layout>
      <Box maxWidth="800px" margin="auto">
        <VStack spacing={8}>
          <UploadForm setSummary={setSummary} />
          {summary && <Summary summary={summary} />}
        </VStack>
      </Box>
    </Layout>
  )
}