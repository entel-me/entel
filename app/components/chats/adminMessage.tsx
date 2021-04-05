import { Stack, Box, Text } from "@chakra-ui/react"

interface AdminMessageProps {
  content: string
}
export default function AdminMessage({ content }: AdminMessageProps) {
  return (
    <Box
      padding="0.5rem"
      borderColor="gray.600"
      backgroundColor="gray.300"
      borderWidth="2px"
      borderRadius="10px"
      textAlign="center"
      marginX="1rem"
      marginY="0.1rem"
    >
      <Text>{content}</Text>
    </Box>
  )
}

/*
    
        <Stack>
            <StackItem>
                
                <Avatar name={userName} />
                <Box textAlign="left" borderTopRadius="10px" borderRightRadius="10px">
                    {content}
                </Box>
            </StackItem>
        </Stack>
        */
