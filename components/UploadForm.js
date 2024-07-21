import { useState } from 'react'
import { Box, Button, VStack, useToast, Input } from '@chakra-ui/react'
import axios from 'axios'

export default function UploadForm({ setSummary }) {
  const [file, setFile] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const toast = useToast()

  const handleFileChange = (e) => {
    setFile(e.target.files[0])
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!file) {
      toast({
        title: "No file selected",
        status: "warning",
        duration: 3000,
        isClosable: true,
      })
      return
    }

    setIsLoading(true)
    const formData = new FormData()
    formData.append('file', file)

    try {
      const response = await axios.post('/api/summarize', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
      setSummary(response.data.summary)
      toast({
        title: "Summary generated",
        status: "success",
        duration: 3000,
        isClosable: true,
      })
    } catch (error) {
      console.error('Error:', error)
      toast({
        title: "An error occurred",
        description: "Unable to generate summary",
        status: "error",
        duration: 3000,
        isClosable: true,
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Box as="form" onSubmit={handleSubmit} width="100%">
      <VStack spacing={4}>
        <Input
          type="file"
          onChange={handleFileChange}
          accept=".txt,.doc,.docx,.pdf"
        />
        <Button 
          type="submit" 
          colorScheme="blue" 
          isLoading={isLoading}
          loadingText="Summarizing"
        >
          Summarize
        </Button>
      </VStack>
    </Box>
  )
}